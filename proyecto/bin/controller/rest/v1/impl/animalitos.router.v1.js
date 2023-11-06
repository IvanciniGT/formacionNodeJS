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
const express_1 = require("express");
class AnimalitoRouterV1 {
    constructor(controladorAnimalitosV1) {
        this.controladorAnimalitosV1 = controladorAnimalitosV1;
    }
    getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.intenta(request, response, (request, response) => __awaiter(this, void 0, void 0, function* () {
                return yield this.controladorAnimalitosV1.getAll();
            }));
        });
    }
    newAnimalito(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.intenta(request, response, (request, response) => __awaiter(this, void 0, void 0, function* () {
                return yield this.controladorAnimalitosV1.newAnimalito(request.body);
            }));
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.intenta(request, response, (request, response) => __awaiter(this, void 0, void 0, function* () {
                return yield this.controladorAnimalitosV1.delete(parseInt(request.params.id));
            }));
        });
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.intenta(request, response, (request, response) => __awaiter(this, void 0, void 0, function* () {
                return yield this.controladorAnimalitosV1.get(parseInt(request.params.id));
            }));
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.intenta(request, response, (request, response) => __awaiter(this, void 0, void 0, function* () {
                return yield this.controladorAnimalitosV1.update(parseInt(request.params.id), request.body);
            }));
        });
    }
    intenta(request, response, codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let respuesta = yield codigo(request, response);
                response.status(respuesta.code).json(respuesta.body);
            }
            catch (error) {
                response.status(500).json({ error: error });
            }
        });
    }
    configureRouter() {
        let routerAnimalitosV1 = (0, express_1.Router)();
        routerAnimalitosV1.get('/', (request, response) => __awaiter(this, void 0, void 0, function* () { return this.getAll(request, response); }));
        routerAnimalitosV1.post('/', (request, response) => __awaiter(this, void 0, void 0, function* () { return this.newAnimalito(request, response); }));
        routerAnimalitosV1.delete('/:id', (request, response) => __awaiter(this, void 0, void 0, function* () { return this.delete(request, response); }));
        routerAnimalitosV1.get('/:id', (request, response) => __awaiter(this, void 0, void 0, function* () { return this.get(request, response); }));
        routerAnimalitosV1.put('/:id', (request, response) => __awaiter(this, void 0, void 0, function* () { return this.update(request, response); }));
        return routerAnimalitosV1;
    }
}
