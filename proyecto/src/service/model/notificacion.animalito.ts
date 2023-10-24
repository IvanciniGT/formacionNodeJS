import { AnimalitoRestV1 } from "../../controller/rest/v1/model/animalito";
import { TipoNotificacionAnimalito } from "./tipo.notificacion.animalito";

export interface NotificacionAnimalito {
    operacion: TipoNotificacionAnimalito
    animalito: AnimalitoRestV1
}
