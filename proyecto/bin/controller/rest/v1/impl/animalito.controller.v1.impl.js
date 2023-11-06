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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalitoControllerV1Impl = void 0;
// Express
//     openAPI - Validaciones -> EXPONER?
//     CORS
//     HELMET
//  Router
class AnimalitoControllerV1Impl {
    constructor(mapeadorDeAnimalitos, animalitoService) {
        this.mapeadorDeAnimalitos = mapeadorDeAnimalitos;
        this.animalitoService = animalitoService;
    }
    newAnimalito(animalito) {
        return this.intentar(201, () => __awaiter(this, void 0, void 0, function* () {
            const animalitoDTO = this.mapeadorDeAnimalitos.toDatosAnimalitoDTO(animalito);
            const animalitoCreado = yield this.animalitoService.newAnimalito(animalitoDTO);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoCreado);
        }));
    }
    get(id) {
        return this.intentar(200, () => __awaiter(this, void 0, void 0, function* () {
            const animalitoDTO = yield this.animalitoService.get(id);
            if (animalitoDTO)
                return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO);
            else
                throw { code: 404, message: "Animalito no encontrado" };
        }));
    }
    delete(id) {
        return this.intentar(200, () => __awaiter(this, void 0, void 0, function* () {
            const animalitoDTO = yield this.animalitoService.delete(id);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO);
        }));
    }
    getAll() {
        return this.intentar(200, () => __awaiter(this, void 0, void 0, function* () {
            const animalitosDTO = yield this.animalitoService.getAll();
            return animalitosDTO.map(animalitoDTO => this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoDTO));
        }));
    }
    update(id, animalito) {
        return this.intentar(200, () => __awaiter(this, void 0, void 0, function* () {
            const animalitoDTO = this.mapeadorDeAnimalitos.toDatosAModificarDTO(animalito);
            const animalitoActualizado = yield this.animalitoService.update(id, animalitoDTO);
            return this.mapeadorDeAnimalitos.toAnimalitoRestV1(animalitoActualizado);
        }));
    }
    intentar(statusCode, codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Promise.resolve({ code: statusCode, body: yield codigo() });
            }
            catch (error) {
                return Promise.reject({ code: 500, error });
            }
        });
    }
}
exports.AnimalitoControllerV1Impl = AnimalitoControllerV1Impl;
