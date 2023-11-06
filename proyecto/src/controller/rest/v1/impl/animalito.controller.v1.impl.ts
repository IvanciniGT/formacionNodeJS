import { AnimalitoService } from "../../../../service/animalitos.service";
import { AnimalitoControllerV1 } from "../animalito.controller.v1";
import { AnimalitoRestV1 } from "../model/animalito";
import { DatosAnimalitoRestV1 } from "../model/datos.animalito";
import { HttpRespuesta } from "./http.respuesta";
import { MapeadorDeAnimalitos } from "./mapper/animalitos.mapper";


// Express
//     openAPI - Validaciones -> EXPONER?
//     CORS
//     HELMET
//  Router
export class AnimalitoControllerV1Impl implements AnimalitoControllerV1{

    constructor(
        private readonly mapeadorDeAnimalitos: MapeadorDeAnimalitos,
        private readonly animalitoService: AnimalitoService
    ) {}

    newAnimalito(animalito: DatosAnimalitoRestV1): Promise<HttpRespuesta<AnimalitoRestV1>> {
        return this.intentar(201,async ()=>{
            const animalitoDTO = this.mapeadorDeAnimalitos.toDatosAnimalitoDTO(animalito);
            const animalitoCreado = await this.animalitoService.newAnimalito(animalitoDTO);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoCreado);
        });
    }
    get(id: number): Promise<HttpRespuesta<AnimalitoRestV1>>{
        return this.intentar(200,async ()=>{
            const animalitoDTO = await this.animalitoService.get(id);
            if(animalitoDTO)
                return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO);
            else
                throw {code: 404, message: "Animalito no encontrado"};
        });
    }
    delete(id: number): Promise<HttpRespuesta<AnimalitoRestV1>>{
        return this.intentar(200,async ()=>{
            const animalitoDTO = await this.animalitoService.delete(id);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO);
        });
    }
    getAll(): Promise<HttpRespuesta<AnimalitoRestV1[]>> {
        return this.intentar(200,async ()=>{
            const animalitosDTO = await this.animalitoService.getAll();
            return animalitosDTO.map(animalitoDTO => this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO));
        });
    }
    update(id: number, animalito: Partial<DatosAnimalitoRestV1>): Promise<HttpRespuesta<AnimalitoRestV1>> {
        return this.intentar(200,async ()=>{
            const animalitoDTO = this.mapeadorDeAnimalitos.toDatosAModificarDTO(animalito);
            const animalitoActualizado = await this.animalitoService.update(id, animalitoDTO);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoActualizado);
        });
    }

    private async intentar<T>(statusCode:number, codigo:()=>any): Promise<HttpRespuesta<T>>{
        try{
            return Promise.resolve({code:statusCode, body: await codigo()});
        }catch(error){
            return Promise.reject({code: 500, error});
        }
    }
}