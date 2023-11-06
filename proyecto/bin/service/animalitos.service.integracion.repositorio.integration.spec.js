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
const dependencias_1 = require("../app/dependencias");
const animalitos_service_impl_1 = require("./impl/animalitos.service.impl");
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
class EmailServiceDummy {
    enviarEmail(destinatario, asunto, mensaje) {
        return Promise.resolve();
    }
}
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
let repositorioDeAnimalitos = (0, dependencias_1.getAnimalitosRepository)();
function getServicioDeAnimalitos() {
    // Tendré que hacer que funcione contra el repo de pacotilla
    // TODO
    return new animalitos_service_impl_1.AnimalitoServiceImpl(repositorioDeAnimalitos, new EmailServiceDummy(), (0, dependencias_1.getMapeadorDeAnimalitoService)());
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
    let servicioDeAnimalitos = getServicioDeAnimalitos();
    let nombre = "Mauricio";
    let raza = "Bulldog";
    let edad = 1;
    describe("Creación de animalito a través del servicio", () => {
        // Configuro el mock del servicio de emails
        it("Con datos guays, entonces me devuelve los mismos datos guays, junto con un ID, y el animalito se ha guardado en el reposaitorio", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza, edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            let animalito = yield servicioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            asegurarDatosDeAnimalito(nombre, raza, edad, animalito);
            expect(animalito.id).toBeDefined();
            expect(animalito.id).toBeGreaterThan(0);
            // Asegurarme que está guardado en el repositorio
            let animalitoGuardado = yield repositorioDeAnimalitos.get(animalito.id);
            expect(animalitoGuardado).toBeDefined();
            expect(animalitoGuardado.edad).toEqual(edad);
            expect(animalitoGuardado.nombre).toEqual(nombre);
            expect(animalitoGuardado.raza).toEqual(raza);
            expect(animalitoGuardado.id).toEqual(animalito.id);
        }));
    });
});
