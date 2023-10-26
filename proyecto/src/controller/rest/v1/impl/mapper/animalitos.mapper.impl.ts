import { AnimalitoDTO } from "../../../../../service/model/animalito";
import { DatosAnimalitoDTO } from "../../../../../service/model/datos.animalito";
import { AnimalitoRestV1 } from "../../model/animalito";
import { DatosAnimalitoRestV1 } from "../../model/datos.animalito";
import { MapeadorDeAnimalitos } from "./animalitos.mapper";

export class  MapeadorDeAnimalitosImpl implements  MapeadorDeAnimalitos {
    toDatosAModificarDTO(datosAModificarRestV1: Partial<DatosAnimalitoRestV1>): Partial<DatosAnimalitoDTO> {
        return {...datosAModificarRestV1}
    }
    toAnimalitoRestV1(animalito: AnimalitoDTO): AnimalitoRestV1 {
        return {...animalito}
    }
    toDatosAnimalitoDTO(animalito: DatosAnimalitoRestV1): DatosAnimalitoDTO {
        return {...animalito}
    }
}