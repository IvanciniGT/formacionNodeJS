"use strict";
/*import { Animalito } from "../model/animalito";
import { DatosAnimalito } from "../model/datos.animalito";

export interface AnimalitoRepository {

    newAnimalito(animalito: DatosAnimalito): Promise<Animalito>;
    get(id: number): Promise<Animalito | undefined>;
    delete(id: number): Promise<Animalito>;
    getAll(): Promise<Animalito[]>;
    update(id: number, animalito: Partial<DatosAnimalito>): Promise<Animalito>;

}*/
/*
import { DatosAnimalito } from "../model/datos.animalito"
import { AnimalitoRepository } from "./animalito.repository";

function crearDatosDeNuevoAnimalito(nombre: string, raza: string, edad: number): DatosAnimalito {
    return {
        nombre: nombre,
        raza: raza,
        edad: edad
    }
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
    it("Cuando creo un animalito con datos guays, entonces me devuelve los mismos datos guays, junto con un ID", async () => {
        let nombre = "Firulais";
        let raza = "Mestizo";
        let edad = 3;
        let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , edad);
        let animalito = await repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito);
        expect(animalito.edad).toEqual(edad)
        expect(animalito.nombre).toEqual(nombre)
        expect(animalito.raza).toEqual(raza)
        expect(animalito.id).toBeDefined()
        expect(animalito.id).toBeGreaterThan(0)
    })
    it("Cuando creo un animalito nombre vacio, entonces me devuelve un error gordo", async () => {
        let nombre = "";
        let raza = "Mestizo";
        let edad = 3;
        let datosDeNuevoAnimalito = crearDatosDeNuevoAnimalito(nombre, raza , edad);
        // Asegurar que tengo error cuando llamo a la función newAnimalito
        expect(async () => await repositorioDeAnimalitos.newAnimalito(datosDeNuevoAnimalito)).toThrow( "Nombre vacio" )
    })
})
// Obtener un animalito
// Obtener todos los animalitos
// Actualizar un animalito
// Borrar un animalito
*/ 
