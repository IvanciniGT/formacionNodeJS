import { SequelizeInstance } from "../../../app/dependencias";
import { Animalito } from "../../model/animalito";
import { DatosAnimalito } from "../../model/datos.animalito";
import { createAnimalitoSequelizeRepository } from "../../model/impl/animalito.impl";
import { AnimalitoRepository } from "../animalito.repository";
import { ModelCtor, Model } from 'sequelize';


// Implementar nuestro repositorio de animalitos
export class AnimalitoRepositoryImpl implements AnimalitoRepository {
    AnimalitoSequelizeRepository: ModelCtor<Model<Animalito, DatosAnimalito>>;

    constructor(){
        this.AnimalitoSequelizeRepository = createAnimalitoSequelizeRepository(SequelizeInstance);
    }

    private validarAnimalito(animalito: DatosAnimalito){
        if(!animalito.nombre  || animalito.nombre === "") throw new Error("Nombre vacio");
        if(!animalito.raza  || animalito.raza === "") throw new Error("Raza vacia");
        if(animalito.edad<0) throw new Error("Edad negativa");
    }

    async #intentaBuscarPorId(id: number, funcionSiSeRecupera: Function = async (animalitoEncontrado: Model<Animalito,DatosAnimalito>) => {}){
        const promesa = new Promise<Animalito>((resolve, reject) => {
            this.AnimalitoSequelizeRepository.findByPk(id)
                .then(
                    async animalitoEncontrado => {
                        if(animalitoEncontrado){
                            funcionSiSeRecupera(animalitoEncontrado)
                            .then(
                                ()=> resolve(animalitoEncontrado.dataValues)
                            ).catch(
                                (error:Error) => reject(error)
                            )
                        }else{
                            reject(new Error("Animalito no encontrado"));
                        }
                    }
                ).catch(
                    error => reject(error)
                )
        });
        return promesa;
    }

    async newAnimalito(animalito: DatosAnimalito): Promise<Animalito> {
        try{
            this.validarAnimalito(animalito);
        }catch(error){
            return Promise.reject(error);
        }
        const promesa = new Promise<Animalito>((resolve, reject) => {
            this.AnimalitoSequelizeRepository.create(animalito).then(
                (animalito) => resolve(animalito.dataValues),
            ).catch(
                (error) => reject(error)
            )
        });
        return promesa;
    }
    async get(id: number): Promise<Animalito | undefined> {
        return this.#intentaBuscarPorId(id);
    }

    async delete(id: number): Promise<Animalito> {
        return this.#intentaBuscarPorId(id, async (animalitoEncontrado: Model<Animalito,DatosAnimalito>) => animalitoEncontrado.destroy() );
    }

    update(id: number, animalito: Partial<DatosAnimalito>): Promise<Animalito> {
        return this.#intentaBuscarPorId(id, async (animalitoEncontrado: Model<Animalito,DatosAnimalito>) => animalitoEncontrado.update(animalito));
    }

    async getAll(): Promise<Animalito[]> {
        const promesa = new Promise<Animalito[]>((resolve, reject) => {
            this.AnimalitoSequelizeRepository.findAll()
                .then(
                    animalitos => {
                        resolve(animalitos.map(animalito => animalito.dataValues));
                    }
                ).catch(
                    error => reject(error)
                )
        });
        return promesa;
    }

}