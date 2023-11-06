"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const animalitos_service_impl_1 = require("./impl/animalitos.service.impl");
const dependencias_1 = require("../app/dependencias");
class EmailServiceDummy {
    enviarEmail(destinatario, asunto, mensaje) {
        return Promise.resolve();
    }
}
class EmailServiceSpy {
    constructor() {
        this.destinatario = undefined;
        this.asunto = undefined;
        this.mensaje = undefined;
    }
    enviarEmail(destinatario, asunto, mensaje) {
        this.destinatario = destinatario;
        this.asunto = asunto;
        this.mensaje = mensaje;
        return Promise.resolve();
    }
}
class EmailServiceMock {
    constructor() {
        this.destinatario = undefined;
        this.asunto = undefined;
        this.mensaje = undefined;
        this.llamada = false;
    }
    teTamaranConEstosDatos(destinatario, asunto, mensaje) {
        this.destinatario = destinatario;
        this.asunto = asunto;
        this.mensaje = mensaje;
    }
    enviarEmail(destinatario, asunto, mensaje) {
        if (this.destinatario !== destinatario)
            return Promise.reject("Destinatario incorrecto");
        if (this.asunto !== asunto)
            return Promise.reject("Asunto incorrecto");
        if (this.mensaje !== mensaje)
            return Promise.reject("Mensaje incorrecto");
        this.llamada = true;
        return Promise.resolve();
    }
    teHanLlamado() {
        return this.llamada;
    }
}
class RepositorioDeAnimalitosFake {
    newAnimalito(animalito) {
        if (animalito.nombre === "")
            return Promise.reject("Nombre vacio"); // FAKE -.> Implemetacion real
        return Promise.resolve(Object.assign(Object.assign({}, animalito), { id: -155 })); // STUB
    }
    get(id) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    update(id, animalito) {
        throw new Error("Method not implemented.");
    }
}
// Mediante librerías como SINON podemos generar TestDoubles
function crearDatosDeNuevoAnimalito(nombre, raza, edad) {
    return {
        nombre: nombre,
        raza: raza,
        edad: edad
    };
}
function asegurarDatosDeAnimalito(nombre, raza, edad, animalito) {
    expect(animalito.edad).toEqual(edad);
    expect(animalito.nombre).toEqual(nombre);
    expect(animalito.raza).toEqual(raza);
}
let emailServiceSpy = new EmailServiceSpy();
let emailServiceMock = new EmailServiceMock();
function getServicioDeAnimalitos() {
    // Tendré que hacer que funcione contra el repo de pacotilla
    // TODO
    return new animalitos_service_impl_1.AnimalitoServiceImpl(new RepositorioDeAnimalitosFake(), emailServiceSpy, (0, dependencias_1.getMapeadorDeAnimalitoService)());
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
    let servicioDeAnimalitos = getServicioDeAnimalitos();
    let nombre = "Mauricio";
    let raza = "Bulldog";
    let edad = 1;
    describe("Creación de animalito", () => {
        // Configuro el mock del servicio de emails
        emailServiceMock.teTamaranConEstosDatos("altas@animalitos-fermin.com", "Nuevo animalito", `Se ha dado de alta un nuevo animalito con nombre ${nombre}`);
        it("Con datos guays, entonces me devuelve los mismos datos guays, junto con un ID", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza, edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            let animalito = yield servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            asegurarDatosDeAnimalito(nombre, raza, edad, animalito);
            expect(animalito.id).toBeDefined();
            expect(animalito.id).toEqual(-155);
            // Asegurarme que se haya solicitado el envío del email
        }));
        // ESTO SERIA MEDIANTE UN SPY
        it("y se envía un email a altas@animalitos-fermin.com ...", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(emailServiceSpy.destinatario).toEqual("altas@animalitos-fermin.com");
            expect(emailServiceSpy.asunto).toEqual("Nuevo animalito");
            expect(emailServiceSpy.mensaje).toEqual(`Se ha dado de alta un nuevo animalito con nombre ${nombre}`);
        }));
        // Y envía una notificación a los suscriptores
        // ESTO SERIA MEDIANTE UN MOCK
        it("y se envía un email a altas@animalitos-fermin.com ...", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(emailServiceMock.teHanLlamado()).toBeTruthy();
        }));
        it("Con datos sin nombre, entonces me devuelve ostion", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito("", raza, edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            expect(yield servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toThrow("Nombre vacio");
        }));
    });
    describe("Recuperación de animalito existente", () => {
        // Usaría un Dummy del Servicio de Emails
        it("Al pasar el id de un animalito existente, me devuelve sus datos", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza, edad);
            let animalito = yield servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            let animalitoRecuperado = yield servicioDeAnimalitos.get(animalito.id);
            expect(animalitoRecuperado).toBeDefined();
            asegurarDatosDeAnimalito(nombre, raza, edad, animalitoRecuperado);
            expect(animalitoRecuperado.id).toEqual(animalito.id);
        }));
    });
});
