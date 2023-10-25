/*import { Animalito } from "../model/animalito";
import { DatosAnimalito } from "../model/datos.animalito";

export interface AnimalitoRepository {

    newAnimalito(animalito: DatosAnimalito): Promise<Animalito>;
    get(id: number): Promise<Animalito | undefined>;
    delete(id: number): Promise<Animalito>;
    getAll(): Promise<Animalito[]>;
    update(id: number, animalito: Partial<DatosAnimalito>): Promise<Animalito>;

}*/

import { Animalito } from "../model/animalito";
import { DatosAnimalito } from "../model/datos.animalito"
import { AnimalitoRepository } from "./animalito.repository";

function crearDatosDeNuevoAnimalito(nombre: string, raza: string, edad: number): DatosAnimalito {
    return {
        nombre: nombre,
        raza: raza,
        edad: edad
    }
}

function asegurarDatosDeAnimalito(nombre: string, raza: string, edad: number, animalito: Animalito) {
    expect(animalito.edad).toEqual(edad)
    expect(animalito.nombre).toEqual(nombre)
    expect(animalito.raza).toEqual(raza)
}
function getRepositorioDeAnimalitos(): AnimalitoRepository {
    // TODO
}

// UNITARIAS DEL REPOSITORIO DE ANIMALITOS
// Creación de un animalito
//   Si llamo a la función newAnimalito y le paso datos guays... entonces, me devuelve los mismos datos guays, junto con un ID
//   Si llamo a la función newAnimalito y le paso datos de mierda... entonces, explota
describe("Dado un repositorio de animalitos", () => {
    let repositorioDeAnimalitos: AnimalitoRepository = getRepositorioDeAnimalitos();
    let nombre = "Firulais";
    let raza = "Mestizo";
    let edad = 3;
    describe("Creación de animalitos", () => {
        it("con nombre vacio, entonces me devuelve un error gordo", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito("", raza , edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            expect(async () => await repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toThrow( "Nombre vacio" )
        })
        it("con raza vacia, entonces me devuelve un error gordo", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, "" , edad);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            expect(async () => await repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toThrow( "Raza vacia" )
        })
        it("con edad negativa, entonces me devuelve un error gordo", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , -7);
            // Asegurar que tengo error cuando llamo a la función newAnimalito
            expect(async () => await repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toThrow( "Edad negativa" )
        })
        it("con datos guays, entonces me devuelve los mismos datos guays, junto con un ID", async () => {
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , edad);
            let animalito = await repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            asegurarDatosDeAnimalito(nombre, raza, edad, animalito)
            expect(animalito.id).toBeDefined()
            expect(animalito.id).toBeGreaterThan(0)
        })

    });
    // Obtener un animalito
    describe("Obtener un animalito", () => {
        it("Cuando solicito un animalito que existe en el repositorio mediante su id, entonces me devuelve los datos de ese animalito",async ()=>{
            let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , edad);
            let animalito = await repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
            let animalitoObtenido = await repositorioDeAnimalitos.get(animalito.id);
            expect(animalitoObtenido).toBeDefined()
            asegurarDatosDeAnimalito(nombre, raza, edad, animalitoObtenido!)
            expect(animalitoObtenido!.id).toEqual(animalito.id)
        })
        it("Cuando solicito un animalito que no existe en el repositorio mediante un id ficticio, entonces me devuelve nada",async ()=>{
            let animalitoObtenido = await repositorioDeAnimalitos.get(-177);
            expect(animalitoObtenido).toBeUndefined()
        })
    });
})
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