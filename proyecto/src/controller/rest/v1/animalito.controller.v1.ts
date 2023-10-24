import { AnimalitoRestV1 } from "./model/animalito";
import { DatosAnimalitoRestV1 } from "./model/datos.animalito";

export interface AnimalitoControllerV1{

    newAnimalito(animalito: DatosAnimalitoRestV1): Promise<AnimalitoRestV1>;
    get(id: number): Promise<AnimalitoRestV1 | undefined>;
    delete(id: number): Promise<AnimalitoRestV1>;
    getAll(): Promise<AnimalitoRestV1[]>;
    update(id: number, animalito: Partial<DatosAnimalitoRestV1>): Promise<AnimalitoRestV1>;

}