import { Router, Request, Response} from 'express'
import { AnimalitoControllerV1 } from '../animalito.controller.v1';
import { AnimalitoRestV1 } from '../model/animalito';

class AnimalitoRouterV1 {

    constructor(private readonly controladorAnimalitosV1: AnimalitoControllerV1){}

    async getAll(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            let animalitos:AnimalitoRestV1[] = await this.controladorAnimalitosV1.getAll();
            response.json(animalitos);
        });
    }

    async newAnimalito(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            let animalito:AnimalitoRestV1 = await this.controladorAnimalitosV1.newAnimalito(request.body as AnimalitoRestV1);
            response.json(animalito);
        });
    }
    async delete(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            let animalito:AnimalitoRestV1 = await this.controladorAnimalitosV1.delete(parseInt(request.params.id));
            response.json(animalito);
        });
    }
    async get(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            return await this.controladorAnimalitosV1.get(parseInt(request.params.id));
        });
    }
    async update(request:Request, response:Response){
        this.intenta(request, response, async (request, response)=>{
            let animalito:AnimalitoRestV1 = await this.controladorAnimalitosV1.update(parseInt(request.params.id), request.body as Partial<AnimalitoRestV1>);
            response.json(animalito);
        });
    }

    private async intenta( request:Request, response:Response, codigo: (request:Request, response:Response) => Promise<void> ): Promise<void> {
        try{
            await codigo(request, response);
        }catch(error){
            response.status(500).json({error});
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



