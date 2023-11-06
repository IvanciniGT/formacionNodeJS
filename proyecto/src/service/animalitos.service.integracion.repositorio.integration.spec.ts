import { AnimalitoService } from "./animalitos.service";
import { AnimalitoDTO } from "./model/animalito";
import { DatosAnimalitoDTO } from "./model/datos.animalito";
import { AnimalitoRepository } from "../persistence/repository/animalito.repository";
import { Animalito } from "../persistence/model/animalito";
import { DatosAnimalito } from "../persistence/model/datos.animalito";
import { EmailService } from "./email.service";
import { getAnimalitosRepository, getMapeadorDeAnimalitoService } from "../app/dependencias";
import { AnimalitoServiceImpl } from "./impl/animalitos.service.impl";

/*import { AnimalitoDTO } from "./model/animalito";
import { DatosAnimalitoDTO } from "./model/datos.animalito";
import { NotificacionAnimalito } from "./model/notificacion.animalito";

export interface AnimalitoService {

    newAnimalito(animalito: DatosAnimalitoDTO): Promise<AnimalitoDTO>;
    get(id: number): Promise<AnimalitoDTO | undefined>;
    delete(id: number): Promise<AnimalitoDTO>;
    getAll(): Promise<AnimalitoDTO[]>;
    update(id: number, animalito: Partial<DatosAnimalitoDTO>): Promise<AnimalitoDTO>;
    subscribe(callback:(notificacion: NotificacionAnimalito) => void): () => void;
}
*/
class EmailServiceDummy implements EmailService {
    enviarEmail(destinatario: string, asunto: string, mensaje: string): Promise<void> {
        return Promise.resolve();
    }
}


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

let repositorioDeAnimalitos = getAnimalitosRepository();
function getServicioDeAnimalitos(): AnimalitoService {
    // Tendré que hacer que funcione contra el repo de pacotilla
    // TODO
    return new AnimalitoServiceImpl(repositorioDeAnimalitos, new EmailServiceDummy(), getMapeadorDeAnimalitoService());
}

// UNITARIAS DEL SERVICIO DE ANIMALITOS
//      Servicio de animalitos -> Creación de un animalito
// Si hago la prueba tal y como está, si falla.. qué falla? 
// - Opción 1: Falla el servicio de animalitos
// - Opción 2: Falla el repositorio de animalitos
// - Opción 3: Falla la comunicación entre ambos
// Para que sea una prueba unitaria de verdad de la buena, necesitamos aislar al servicio de animalitos del repositorio de animalitos
// Eso lo podemos hacer creando un repositorio de animalitos de pacotilla... que devuelva siempre 33

describe("Dado un servicio de animalitos y un repositorio de animalitos", () => {
    let servicioDeAnimalitos: AnimalitoService = getServicioDeAnimalitos();
    let nombre = "Mauricio";
    let raza = "Bulldog";
    let edad = 1;
    describe("Creación de animalito a través del servicio", () => {
        // Configuro el mock del servicio de emails
        it("Con datos guays, entonces me devuelve los mismos datos guays, junto con un ID, y el animalito se ha guardado en el reposaitorio", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            let animalito = await servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            asegurarDatosDeAnimalito(nombre, raza, edad, animalito);
            expect(animalito.id).toBeDefined()
            expect(animalito.id).toBeGreaterThan(0)
            // Asegurarme que está guardado en el repositorio
            let animalitoGuardado = await repositorioDeAnimalitos.get(animalito.id)
            expect(animalitoGuardado).toBeDefined()
            expect(animalitoGuardado!.edad).toEqual(edad)
            expect(animalitoGuardado!.nombre).toEqual(nombre)
            expect(animalitoGuardado!.raza).toEqual(raza)
            expect(animalitoGuardado!.id).toEqual(animalito.id)
        })

    })

});
