
import { AnimalitoDTO } from "../../../../../service/model/animalito";
import { DatosAnimalitoDTO } from "../../../../../service/model/datos.animalito";
import { AnimalitoRestV1 } from "../../model/animalito";
import { DatosAnimalitoRestV1 } from "../../model/datos.animalito";

export interface MapeadorDeAnimalitos {
    toDatosAModificarDTO(datosAModificarRestV1: Partial<DatosAnimalitoRestV1>): Partial<DatosAnimalitoDTO>;
    toAnimalitoRestV1(animalito: AnimalitoDTO): AnimalitoRestV1 
    toDatosAnimalitoDTO(animalito: DatosAnimalitoRestV1): DatosAnimalitoDTO; 
}
