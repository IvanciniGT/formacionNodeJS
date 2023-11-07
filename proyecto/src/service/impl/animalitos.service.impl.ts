import { DatosAnimalito } from "../../persistence/model/datos.animalito";
import { AnimalitoRepository } from "../../persistence/repository/animalito.repository";
import { AnimalitoService } from "../animalitos.service";
import { EmailService } from "../email.service";
import { AnimalitoDTO } from "../model/animalito";
import { DatosAnimalitoDTO } from "../model/datos.animalito";
import { NotificacionAnimalito } from "../model/notificacion.animalito";
import { TipoNotificacionAnimalito } from "../model/tipo.notificacion.animalito";
import { MapeadorDeAnimalitos } from "./mapper/animalitos.mapper";

export class AnimalitoServiceImpl implements AnimalitoService {

    private readonly DESTINATARIO = "altas@animalitos-fermin.com";
    private readonly ASUNTO = "Nuevo animalito";
    private readonly MENSAJE = "Se ha dado de alta un nuevo animalito con nombre ";
    private readonly subscripciones: ((notificacion: NotificacionAnimalito) => void)[] = [];

    constructor(private repositorioDeAnimalitos: AnimalitoRepository,
                private servicioDeEmails: EmailService,
                private mapeadorDeAnimalitos: MapeadorDeAnimalitos){}

    async newAnimalito(animalito: DatosAnimalitoDTO): Promise<AnimalitoDTO> {
        // TODO validar el dato... mejor si es a través de un validador (y limito responsabilidades)
        // Convertir el objeto que me dan: DatosAnimalitoDTO en el objeto que necesita la capa de persistencia: DatosAnimalito
        let datosAnimalito: DatosAnimalito = this.mapeadorDeAnimalitos.toDatosAnimalito(animalito);
        // Guardar el animalito en la base de datos
        return this.intentar( async ()=> {
            let animalitoPersistido = await this.repositorioDeAnimalitos.newAnimalito(datosAnimalito);
            // Enviar un email a una direccion de correo electronico
            this.servicioDeEmails.enviarEmail(this.DESTINATARIO, this.ASUNTO, this.MENSAJE+animalito.nombre);
            // Convertir el objeto que me da la capa de persistencia: DatosAnimalito en el objeto que necesita el cliente: AnimalitoDTO
            let animalitoDTO: AnimalitoDTO = this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
            // Notificar a los suscriptores
            this.notificar(TipoNotificacionAnimalito.NEW, animalitoDTO);
            return animalitoDTO
        });
    }

    async get(id: number): Promise<AnimalitoDTO | undefined> {
        return this.intentar( async ()=> {
            let animalitoPersistido = await this.repositorioDeAnimalitos.get(id);
            if(animalitoPersistido)
                return this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
            else
                return undefined;
            });
        }

    async delete(id: number): Promise<AnimalitoDTO> {
        return this.intentar( async ()=> {
            let animalitoPersistido = await this.repositorioDeAnimalitos.delete(id);
            let animalitoDTO: AnimalitoDTO = this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
            this.notificar(TipoNotificacionAnimalito.DELETE, animalitoDTO);
            return animalitoDTO;
        });
    }

    async getAll(): Promise<AnimalitoDTO[]> {
        return this.intentar( async ()=> {
            let animalitosPersistidos = await this.repositorioDeAnimalitos.getAll();
            return Promise.resolve(animalitosPersistidos.map(animalito => this.mapeadorDeAnimalitos.toAnimalitoDTO(animalito)));
            //return Promise.resolve(animalitosPersistidos.map(this.mapeadorDeAnimalitos.toAnimalitoDTO));
        });
    }

    async update(id: number, datosAModificarDTO: Partial<DatosAnimalitoDTO>): Promise<AnimalitoDTO> {
        return this.intentar( async ()=> {
            let datosAModificar = this.mapeadorDeAnimalitos.toDatosAModificar(datosAModificarDTO);
            let animalitoPersistido = await this.repositorioDeAnimalitos.update(id, datosAModificar);
            let animalitoDTO: AnimalitoDTO = this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
            this.notificar(TipoNotificacionAnimalito.UPDATE, animalitoDTO);
            return animalitoDTO;
        });
    }

    subscribe(callback:(notificacion: NotificacionAnimalito) => void): () => void {
        this.subscripciones.push(callback);
        return () => {
            this.subscripciones.splice(this.subscripciones.indexOf(callback), 1);
        }
    }

    private async intentar(codigo:()=>any): Promise<any>{
        try{
            return Promise.resolve(await codigo());
        }catch(error){
            return Promise.reject(error);
        }
    }

    private notificar(operacion: TipoNotificacionAnimalito, animalito: AnimalitoDTO): void {
        let notificacion: NotificacionAnimalito = Object.freeze({
            operacion: Object.freeze(operacion),
            animalito: Object.freeze(animalito)
        })
        this.subscripciones.forEach(notificar => notificar(notificacion));
    }
}