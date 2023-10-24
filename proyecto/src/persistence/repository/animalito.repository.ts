import { Animalito } from "../model/animalito";
import { DatosAnimalito } from "../model/datos.animalito";

export interface AnimalitoRepository {

    newAnimalito(animalito: DatosAnimalito): Promise<Animalito>;
    get(id: number): Promise<Animalito | undefined>;
    delete(id: number): Promise<Animalito>;
    getAll(): Promise<Animalito[]>;
    update(id: number, animalito: Partial<DatosAnimalito>): Promise<Animalito>;

}