"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapeadorDeAnimalitosV1Impl = void 0;
class MapeadorDeAnimalitosV1Impl {
    toDatosAModificarDTO(datosAModificarRestV1) {
        return Object.assign({}, datosAModificarRestV1);
    }
    toAnimalitoRestV1(animalito) {
        return Object.assign({}, animalito);
    }
    toDatosAnimalitoDTO(animalito) {
        return Object.assign({}, animalito);
    }
}
exports.MapeadorDeAnimalitosV1Impl = MapeadorDeAnimalitosV1Impl;
