"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapeadorDeAnimalitosImpl = void 0;
class MapeadorDeAnimalitosImpl {
    toDatosAModificar(datosAModificarDTO) {
        return Object.assign({}, datosAModificarDTO);
    }
    toAnimalitoDTO(animalito) {
        return Object.assign({}, animalito);
    }
    toDatosAnimalito(animalito) {
        return Object.assign({}, animalito);
    }
}
exports.MapeadorDeAnimalitosImpl = MapeadorDeAnimalitosImpl;
