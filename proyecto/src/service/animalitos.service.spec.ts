import { AnimalitoService } from "./animalitos.service";
import { AnimalitoDTO } from "./model/animalito";
import { DatosAnimalitoDTO } from "./model/datos.animalito";
import { AnimalitoRepository } from "../persistence/repository/animalito.repository";
import { Animalito } from "../persistence/model/animalito";
import { DatosAnimalito } from "../persistence/model/datos.animalito";
import { EmailService } from "./email.service";
import { AnimalitoServiceImpl } from "./impl/animalitos.service.impl";
import { getMapeadorDeAnimalitoService } from "../app/dependencias";

class EmailServiceDummy implements EmailService {
    enviarEmail(destinatario: string, asunto: string, mensaje: string): Promise<void> {
        return Promise.resolve();
    }
}
class EmailServiceSpy implements EmailService {
    destinatario: string | undefined = undefined;
    asunto: string | undefined = undefined;
    mensaje: string | undefined = undefined;
    enviarEmail(destinatario: string, asunto: string, mensaje: string): Promise<void> {
        this.destinatario = destinatario;
        this.asunto = asunto;
        this.mensaje = mensaje;
        return Promise.resolve();
    }
}

class EmailServiceMock implements EmailService {
    destinatario: string | undefined = undefined;
    asunto: string | undefined = undefined;
    mensaje: string | undefined = undefined;
    llamada: boolean = false;
    teTamaranConEstosDatos(destinatario: string, asunto: string, mensaje: string): void {
        this.destinatario = destinatario;
        this.asunto = asunto;
        this.mensaje = mensaje;
    }
    enviarEmail(destinatario: string, asunto: string, mensaje: string): Promise<void> {
        this.llamada = true;
        if(this.destinatario !== destinatario) return Promise.reject(new Error("Destinatario incorrecto"))
        if(this.asunto !== asunto) return Promise.reject(new Error("Asunto incorrecto"))
        if(this.mensaje !== mensaje) return Promise.reject(new Error("Mensaje incorrecto"))
        return Promise.resolve();
    }
    teHanLlamado(): boolean {
        return this.llamada;
    }
}
class RepositorioDeAnimalitosFake implements AnimalitoRepository{ 
    private lastAnimalitoCreated: Animalito | undefined = undefined;
    newAnimalito(animalito: DatosAnimalito): Promise<Animalito> {
        if(animalito.nombre === "") return Promise.reject(new Error("Nombre vacio")) // FAKE -.> Implemetacion real
        this.lastAnimalitoCreated= {...animalito, id: -155}
        return Promise.resolve(this.lastAnimalitoCreated)
    }
    get(id: number): Promise<Animalito | undefined> {
        if(this.lastAnimalitoCreated && this.lastAnimalitoCreated.id === id)
            return Promise.resolve(this.lastAnimalitoCreated)
        else
            return Promise.resolve(undefined)
    }
    delete(id: number): Promise<Animalito> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Animalito[]> {
        throw new Error("Method not implemented.");
    }
    update(id: number, animalito: Partial<DatosAnimalito>): Promise<Animalito> {
        throw new Error("Method not implemented.");
    }
}
// Mediante librerías como SINON podemos generar TestDoubles


function crearDatosDeNuevoAnimalito(nombre: string, raza: string, edad: number): DatosAnimalitoDTO {
    return {
        nombre: nombre,
        raza: raza,
        edad: edad
    }
}

function asegurarDatosDeAnimalito(nombre: string, raza: string, edad: number, animalito: AnimalitoDTO) {
    expect(animalito.edad).toEqual(edad)
    expect(animalito.nombre).toEqual(nombre)
    expect(animalito.raza).toEqual(raza)
}

let emailServiceSpy = new EmailServiceSpy()
let emailServiceMock = new EmailServiceMock()


function getServicioDeAnimalitos(): AnimalitoService {
    // Tendré que hacer que funcione contra el repo de pacotilla
    // TODO
    return new AnimalitoServiceImpl(new RepositorioDeAnimalitosFake(), emailServiceMock, getMapeadorDeAnimalitoService());
}

// UNITARIAS DEL SERVICIO DE ANIMALITOS
//      Servicio de animalitos -> Creación de un animalito
// Si hago la prueba tal y como está, si falla.. qué falla? 
// - Opción 1: Falla el servicio de animalitos
// - Opción 2: Falla el repositorio de animalitos
// - Opción 3: Falla la comunicación entre ambos
// Para que sea una prueba unitaria de verdad de la buena, necesitamos aislar al servicio de animalitos del repositorio de animalitos
// Eso lo podemos hacer creando un repositorio de animalitos de pacotilla... que devuelva siempre 33

describe("Dado un servicio de animalitos", () => {
    let servicioDeAnimalitos: AnimalitoService = getServicioDeAnimalitos();
    let nombre = "Mauricio";
    let raza = "Bulldog";
    let edad = 1;
    describe("se puede crear un animalito", () => {
        // Configuro el mock del servicio de emails
        emailServiceMock.teTamaranConEstosDatos("altas@animalitos-fermin.com","Nuevo animalito",`Se ha dado de alta un nuevo animalito con nombre ${nombre}`)

        it("Con datos guays, entonces me devuelve los mismos datos guays, junto con un ID", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            let animalito = await servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            asegurarDatosDeAnimalito(nombre, raza, edad, animalito);
            expect(animalito.id).toBeDefined()
            expect(animalito.id).toEqual(-155)
            // Asegurarme que se haya solicitado el envío del email
        })

        // ESTO SERIA MEDIANTE UN SPY
        /*it("y se envía un email a altas@animalitos-fermin.com ...", async () => {
            expect(emailServiceSpy.destinatario).toEqual("altas@animalitos-fermin.com")
            expect(emailServiceSpy.asunto).toEqual("Nuevo animalito")
            expect(emailServiceSpy.mensaje).toEqual(`Se ha dado de alta un nuevo animalito con nombre ${nombre}`)
        })*/ 
        // Y envía una notificación a los suscriptores
        // ESTO SERIA MEDIANTE UN MOCK
        it("y se envía un email a altas@animalitos-fermin.com ...", async () => {
            expect(emailServiceMock.teHanLlamado()).toBeTrue()
        }) 


        it("Con datos sin nombre, entonces me devuelve ostion", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito("", raza , edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            await expectAsync(servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toBeRejectedWithError("Nombre vacio")
        })
    })

    describe("Recuperación de animalito existente", () => {
        // Usaría un Dummy del Servicio de Emails
        it("Al pasar el id de un animalito existente, me devuelve sus datos", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , edad);
            let animalito = await servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            let animalitoRecuperado = await servicioDeAnimalitos.get(animalito.id);
            expect(animalitoRecuperado).toBeDefined()
            asegurarDatosDeAnimalito(nombre, raza, edad, animalitoRecuperado!);
            expect(animalitoRecuperado!.id).toEqual(animalito.id)
        })
    })

});