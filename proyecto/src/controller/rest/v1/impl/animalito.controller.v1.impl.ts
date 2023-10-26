import { AnimalitoService } from "../../../../service/animalitos.service";
import { AnimalitoControllerV1 } from "../animalito.controller.v1";
import { AnimalitoRestV1 } from "../model/animalito";
import { DatosAnimalitoRestV1 } from "../model/datos.animalito";
import { HttpError } from "./http.error";
import { MapeadorDeAnimalitos } from "./mapper/animalitos.mapper";


// Express
//  Router
export class AnimalitoControllerV1Impl implements AnimalitoControllerV1{

    constructor(
        private readonly mapeadorDeAnimalitos: MapeadorDeAnimalitos,
        private readonly animalitoService: AnimalitoService
    ) {}

    newAnimalito(animalito: DatosAnimalitoRestV1): Promise<AnimalitoRestV1|HttpError> {
        return this.intentar(async ()=>{
            const animalitoDTO = this.mapeadorDeAnimalitos.toDatosAnimalitoDTO(animalito);
            const animalitoCreado = await this.animalitoService.newAnimalito(animalitoDTO);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoCreado);
        });
    }
    get(id: number): Promise<AnimalitoRestV1 | HttpError>{
        return this.intentar(async ()=>{
            const animalitoDTO = await this.animalitoService.get(id);
            if(animalitoDTO)
                return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO);
            else
                return {code: 404, message: "Animalito no encontrado"};
        });
    }
    delete(id: number): Promise<AnimalitoRestV1 | HttpError>{
        return this.intentar(async ()=>{
            const animalitoDTO = await this.animalitoService.delete(id);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO);
        });
    }
    getAll(): Promise<AnimalitoRestV1[] | HttpError> {
        return this.intentar(async ()=>{
            const animalitosDTO = await this.animalitoService.getAll();
            return animalitosDTO.map(animalitoDTO => this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO));
        });
    }
    update(id: number, animalito: Partial<DatosAnimalitoRestV1>): Promise<AnimalitoRestV1 | HttpError> {
        return this.intentar(async ()=>{
            const animalitoDTO = this.mapeadorDeAnimalitos.toDatosAModificarDTO(animalito);
            const animalitoActualizado = await this.animalitoService.update(id, animalitoDTO);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoActualizado);
        });
    }

    private async intentar(codigo:()=>any): Promise<any>{
        try{
            return Promise.resolve(await codigo());
        }catch(error){
            return Promise.reject({code: 500, message: error});
        }
    }
}