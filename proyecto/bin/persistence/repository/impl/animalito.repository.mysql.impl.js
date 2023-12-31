"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AnimalitoRepositoryImpl_instances, _AnimalitoRepositoryImpl_intentaBuscarPorId;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalitoRepositoryImpl = void 0;
const dependencias_1 = require("../../../app/dependencias");
const animalito_impl_1 = require("../../model/impl/animalito.impl");
// Implementar nuestro repositorio de animalitos
class AnimalitoRepositoryImpl {
    constructor() {
        _AnimalitoRepositoryImpl_instances.add(this);
        this.AnimalitoSequelizeRepository = (0, animalito_impl_1.createAnimalitoSequelizeRepository)(dependencias_1.SequelizeInstance);
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validarAnimalito(animalito);
            }
            catch (error) {
                return Promise.reject(error);
            }
            const repo = yield this.AnimalitoSequelizeRepository;
            const promesa = new Promise((resolve, reject) => {
                repo.create(animalito).then((animalito) => resolve(animalito.dataValues)).catch((error) => reject(error));
            });
            return promesa;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _AnimalitoRepositoryImpl_instances, "m", _AnimalitoRepositoryImpl_intentaBuscarPorId).call(this, id, () => { }, (reject, resolve) => { resolve(undefined); });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _AnimalitoRepositoryImpl_instances, "m", _AnimalitoRepositoryImpl_intentaBuscarPorId).call(this, id, (animalitoEncontrado) => __awaiter(this, void 0, void 0, function* () { return animalitoEncontrado.destroy(); }));
        });
    }
    update(id, animalito) {
        return __classPrivateFieldGet(this, _AnimalitoRepositoryImpl_instances, "m", _AnimalitoRepositoryImpl_intentaBuscarPorId).call(this, id, (animalitoEncontrado) => __awaiter(this, void 0, void 0, function* () { return animalitoEncontrado.update(animalito); }));
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = yield this.AnimalitoSequelizeRepository;
            const promesa = new Promise((resolve, reject) => {
                repo.findAll()
                    .then(animalitos => {
                    resolve(animalitos.map(animalito => animalito.dataValues));
                }).catch(error => reject(error));
            });
            return promesa;
        });
    }
}
exports.AnimalitoRepositoryImpl = AnimalitoRepositoryImpl;
_AnimalitoRepositoryImpl_instances = new WeakSet(), _AnimalitoRepositoryImpl_intentaBuscarPorId = function _AnimalitoRepositoryImpl_intentaBuscarPorId(id, funcionSiSeRecupera = (animalitoEncontrado) => __awaiter(this, void 0, void 0, function* () { }), funcionSiNoSeRecupera = (reject, Resolve) => { reject(new Error("Animalito no encontrado")); }) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = yield this.AnimalitoSequelizeRepository;
        const promesa = new Promise((resolve, reject) => {
            repo.findByPk(id)
                .then((animalitoEncontrado) => __awaiter(this, void 0, void 0, function* () {
                if (animalitoEncontrado) {
                    funcionSiSeRecupera(animalitoEncontrado)
                        .then(() => resolve(animalitoEncontrado.dataValues)).catch((error) => reject(error));
                }
                else {
                    funcionSiNoSeRecupera(reject, resolve); //
                }
            })).catch(error => reject(error));
        });
        return promesa;
    });
};
