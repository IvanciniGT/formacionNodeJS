import { HttpRespuesta } from "./impl/http.respuesta";
import { AnimalitoRestV1 } from "./model/animalito";
import { DatosAnimalitoRestV1 } from "./model/datos.animalito";


// Express
//  Router
export interface AnimalitoControllerV1{

    newAnimalito(animalito: DatosAnimalitoRestV1): Promise<HttpRespuesta<AnimalitoRestV1>>;
    get(id: number): Promise<HttpRespuesta<AnimalitoRestV1>>;
    delete(id: number): Promise<HttpRespuesta<AnimalitoRestV1>>;
    getAll(): Promise<HttpRespuesta<AnimalitoRestV1[]>>;
    update(id: number, animalito: Partial<DatosAnimalitoRestV1>): Promise<HttpRespuesta<AnimalitoRestV1>>;

}