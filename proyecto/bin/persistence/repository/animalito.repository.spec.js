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
const dependencias_1 = require("../../app/dependencias");
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
function getRepositorioDeAnimalitos() {
    return (0, dependencias_1.getAnimalitosRepository)();
}
// UNITARIAS DEL REPOSITORIO DE ANIMALITOS
// Creación de un animalito
//   Si llamo a la función newAnimalito y le paso datos guays... entonces, me devuelve los mismos datos guays, junto con un ID
//   Si llamo a la función newAnimalito y le paso datos de mierda... entonces, explota
describe("Dado un repositorio de animalitos", () => {
    let repositorioDeAnimalitos = getRepositorioDeAnimalitos();
    let nombre = "Firulais";
    let raza = "Mestizo";
    let edad = 3;
    describe("Creación de animalitos", () => {
        it("con nombre vacio, entonces me devuelve un error gordo", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito("", raza, edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            expectAsync(repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toBeRejectedWith("Nombre vacio");
        }));
        it("con raza vacia, entonces me devuelve un error gordo", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, "", edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            expectAsync(repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toBeRejectedWith("Raza vacia");
        }));
        it("con edad negativa, entonces me devuelve un error gordo", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza, -7);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            expectAsync(repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toBeRejectedWith("Edad negativa");
        }));
        it("con datos guays, entonces me devuelve los mismos datos guays, junto con un ID", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza, edad);
            let animalito = yield repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            asegurarDatosDeAnimalito(nombre, raza, edad, animalito);
            expect(animalito.id).toBeDefined();
            expect(animalito.id).toBeGreaterThan(0);
        }));
    });
    // Obtener un animalito
    describe("Obtener un animalito", () => {
        it("Cuando solicito un animalito que existe en el repositorio mediante su id, entonces me devuelve los datos de ese animalito", () => __awaiter(void 0, void 0, void 0, function* () {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza, edad);
            let animalito = yield repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            let animalitoObtenido = yield repositorioDeAnimalitos.get(animalito.id);
            expect(animalitoObtenido).toBeDefined();
            asegurarDatosDeAnimalito(nombre, raza, edad, animalitoObtenido);
            expect(animalitoObtenido.id).toEqual(animalito.id);
        }));
        it("Cuando solicito un animalito que no existe en el repositorio mediante un id ficticio, entonces me devuelve nada", () => __awaiter(void 0, void 0, void 0, function* () {
            let animalitoObtenido = yield repositorioDeAnimalitos.get(-177);
            expect(animalitoObtenido).toBeUndefined();
        }));
    });
});
// Obtener todos los animalitos
// Actualizar un animalito
// Borrar un animalito
/// Cuando desarrollo software hoy en día intento seguir los principios SOLID
/// Cuando desarrollo tests, intento seguir los principios FIRST
/// F: Fast
/// I: Independent: Una prueba no debe depender de otra !!!!!!!!!!!!!!!!!
/// R: Repeatable: Debe poder ejecutarse todas las veces que quiera
/// S: Self-validating: Debe incluir todos las validaciones necesarias para saber si la funcionalidad o requisito que hy definido se cumple
/// T: Timely: Oportuna... Debo tener la prueba en el momento adecuado
