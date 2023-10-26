import { Animalito } from "../../../persistence/model/animalito";
import { DatosAnimalito } from "../../../persistence/model/datos.animalito";
import { AnimalitoDTO } from "../../model/animalito";
import { DatosAnimalitoDTO } from "../../model/datos.animalito";
import { MapeadorDeAnimalitos } from "./animalitos.mapper";

export class  MapeadorDeAnimalitosImpl implements  MapeadorDeAnimalitos {
    toDatosAModificar(datosAModificarDTO: Partial<DatosAnimalitoDTO>): Partial<DatosAnimalito>{
        return {...datosAModificarDTO}
    }
    toAnimalitoDTO(animalito: Animalito): AnimalitoDTO{
        return {...animalito}
    }
    toDatosAnimalito(animalito: DatosAnimalitoDTO): DatosAnimalito{
        return {...animalito}
    }
}
