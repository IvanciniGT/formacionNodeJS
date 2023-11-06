import { Animalito } from "../../model/animalito";
import { DatosAnimalito } from "../../model/datos.animalito";
import { AnimalitoRepository } from "../animalito.repository";

export class AnimalitoRepositoryImpl implements AnimalitoRepository {

    private animalitos: Animalito[] = [];
    private id = 1;

    private validarAnimalito(animalito: DatosAnimalito){
        if(!animalito.nombre  || animalito.nombre === "") throw new Error("Nombre vacio");
        if(!animalito.raza  || animalito.raza === "") throw new Error("Raza vacia");
        if(animalito.edad<0) throw new Error("Edad negativa");
    }

    newAnimalito(animalito: DatosAnimalito): Promise<Animalito> {
        try{
            this.validarAnimalito(animalito);
        }catch(error){
            return Promise.reject(error);
        }
        const nuevoAnimalito: Animalito = {
            id: this.id++,
            ...animalito
        }
        this.animalitos.push(nuevoAnimalito);
        return Promise.resolve(nuevoAnimalito);
    }
    get(id: number): Promise<Animalito | undefined> {
        let animalito = this.animalitos.find(animalito => animalito.id === id);
        return Promise.resolve(animalito);
    }
    delete(id: number): Promise<Animalito> {
        let animalito = this.animalitos.find(animalito => animalito.id === id);
        if(!animalito) 
            return Promise.reject(new Error("Animalito no encontrado"));
        this.animalitos = this.animalitos.filter(animalito => animalito.id !== id);
        return Promise.resolve(animalito);
    }
    getAll(): Promise<Animalito[]> {
        return Promise.resolve(this.animalitos);
    }
    update(id: number, animalito: Partial<DatosAnimalito>): Promise<Animalito> {
        let animalitoEncontrado = this.animalitos.find(animalito => animalito.id === id);
        if(!animalitoEncontrado) 
            return Promise.reject(new Error("Animalito no encontrado"));
        animalitoEncontrado = {
            ...animalitoEncontrado,
            ...animalito
        }
        return Promise.resolve(animalitoEncontrado);
    }

}