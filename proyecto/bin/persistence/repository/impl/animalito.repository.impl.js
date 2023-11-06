"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalitoRepositoryImpl = void 0;
class AnimalitoRepositoryImpl {
    constructor() {
        this.animalitos = [];
        this.id = 1;
    }
    validarAnimalito(animalito) {
        if (!animalito.nombre || animalito.nombre === "")
            throw new Error("Nombre vacio");
        if (!animalito.raza || animalito.raza === "")
            throw new Error("Raza vacia");
        if (animalito.edad < 0)
            throw new Error("Edad negativa");
    }
    newAnimalito(animalito) {
        try {
            this.validarAnimalito(animalito);
        }
        catch (error) {
            return Promise.reject(error);
        }
        const nuevoAnimalito = Object.assign({ id: this.id++ }, animalito);
        this.animalitos.push(nuevoAnimalito);
        return Promise.resolve(nuevoAnimalito);
    }
    get(id) {
        let animalito = this.animalitos.find(animalito => animalito.id === id);
        return Promise.resolve(animalito);
    }
    delete(id) {
        let animalito = this.animalitos.find(animalito => animalito.id === id);
        if (!animalito)
            return Promise.reject(new Error("Animalito no encontrado"));
        this.animalitos = this.animalitos.filter(animalito => animalito.id !== id);
        return Promise.resolve(animalito);
    }
    getAll() {
        return Promise.resolve(this.animalitos);
    }
    update(id, animalito) {
        let animalitoEncontrado = this.animalitos.find(animalito => animalito.id === id);
        if (!animalitoEncontrado)
            return Promise.reject(new Error("Animalito no encontrado"));
        animalitoEncontrado = Object.assign(Object.assign({}, animalitoEncontrado), animalito);
        return Promise.resolve(animalitoEncontrado);
    }
}
exports.AnimalitoRepositoryImpl = AnimalitoRepositoryImpl;
