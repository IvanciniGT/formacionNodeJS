import { Animalito } from "../../../persistence/model/animalito";
import { DatosAnimalito } from "../../../persistence/model/datos.animalito";
import { AnimalitoDTO } from "../../model/animalito";
import { DatosAnimalitoDTO } from "../../model/datos.animalito";

export interface MapeadorDeAnimalitos {
    toDatosAModificar(datosAModificarDTO: Partial<DatosAnimalitoDTO>): Partial<DatosAnimalito>;
    toAnimalitoDTO(animalito: Animalito): AnimalitoDTO;
    toDatosAnimalito(animalito: DatosAnimalitoDTO): DatosAnimalito; 
}
