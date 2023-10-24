import { AnimalitoDTO } from "./model/animalito";
import { DatosAnimalitoDTO } from "./model/datos.animalito";
import { NotificacionAnimalito } from "./model/notificacion.animalito";

export interface AnimalitoService {

    newAnimalito(animalito: DatosAnimalitoDTO): Promise<AnimalitoDTO>;
    get(id: number): Promise<AnimalitoDTO | undefined>;
    delete(id: number): Promise<AnimalitoDTO>;
    getAll(): Promise<AnimalitoDTO[]>;
    update(id: number, animalito: Partial<DatosAnimalitoDTO>): Promise<AnimalitoDTO>;
    subscribe(callback:(notificacion: NotificacionAnimalito) => void): () => void;
}