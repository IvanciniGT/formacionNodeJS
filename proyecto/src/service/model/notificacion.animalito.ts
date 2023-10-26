import { AnimalitoDTO } from "./animalito";
import { TipoNotificacionAnimalito } from "./tipo.notificacion.animalito";

export interface NotificacionAnimalito {
    operacion: TipoNotificacionAnimalito
    animalito: AnimalitoDTO
}
