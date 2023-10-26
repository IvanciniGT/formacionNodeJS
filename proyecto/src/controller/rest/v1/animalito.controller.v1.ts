import { HttpError } from "./impl/http.error";
import { AnimalitoRestV1 } from "./model/animalito";
import { DatosAnimalitoRestV1 } from "./model/datos.animalito";


// Express
//  Router
export interface AnimalitoControllerV1{

    newAnimalito(animalito: DatosAnimalitoRestV1): Promise<AnimalitoRestV1 | HttpError>;
    get(id: number): Promise<AnimalitoRestV1 | HttpError>;
    delete(id: number): Promise<AnimalitoRestV1| HttpError>;
    getAll(): Promise<AnimalitoRestV1[]| HttpError>;
    update(id: number, animalito: Partial<DatosAnimalitoRestV1>): Promise<AnimalitoRestV1| HttpError>;

}