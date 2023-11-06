import { Router, Request, Response} from 'express'
import { AnimalitoControllerV1 } from '../animalito.controller.v1';
import { AnimalitoRestV1 } from '../model/animalito';
import { HttpRespuesta } from './http.respuesta';

export class AnimalitoRouterV1 {

    constructor(private readonly controladorAnimalitosV1: AnimalitoControllerV1){}

    async getAll(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            return await this.controladorAnimalitosV1.getAll();
        });
    }

    async newAnimalito(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            return await this.controladorAnimalitosV1.newAnimalito(request.body as AnimalitoRestV1);
        });
    }
    async delete(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            return await this.controladorAnimalitosV1.delete(parseInt(request.params.id));
        });
    }
    async get(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            return await this.controladorAnimalitosV1.get(parseInt(request.params.id));
        });
    }
    async update(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            return await this.controladorAnimalitosV1.update(parseInt(request.params.id), request.body as Partial<AnimalitoRestV1>);
        });
    }

    private async intenta( request:Request, response:Response, codigo: (request:Request, response:Response) => Promise<HttpRespuesta<any>> ): Promise<void> {
        try{
            let respuesta:HttpRespuesta<any>=await codigo(request, response);
            response.status(respuesta.code).json(respuesta.body);
        }catch(error){
            response.status(500).json({error: error});
        }
    }

    configureRouter(): Router {
        let routerAnimalitosV1 = Router();
        routerAnimalitosV1.get('/', async (request, response)=>this.getAll(request, response));
        routerAnimalitosV1.post('/', async (request, response)=>this.newAnimalito(request, response));
        routerAnimalitosV1.delete('/:id', async (request, response)=>this.delete(request, response));
        routerAnimalitosV1.get('/:id', async (request, response)=>this.get(request, response));
        routerAnimalitosV1.put('/:id', async (request, response)=>this.update(request, response));
        return routerAnimalitosV1;
    }
}



