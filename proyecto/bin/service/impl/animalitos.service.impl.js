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
exports.AnimalitoServiceImpl = void 0;
const tipo_notificacion_animalito_1 = require("../model/tipo.notificacion.animalito");
class AnimalitoServiceImpl {
    constructor(repositorioDeAnimalitos, servicioDeEmails, mapeadorDeAnimalitos) {
        this.repositorioDeAnimalitos = repositorioDeAnimalitos;
        this.servicioDeEmails = servicioDeEmails;
        this.mapeadorDeAnimalitos = mapeadorDeAnimalitos;
        this.DESTINATARIO = "alta@animalitos-fermin.com";
        this.ASUNTO = "Nuevo animalito";
        this.MENSAJE = "Se ha dado de alta un nuevo animalito: ";
        this.subscripciones = [];
    }
    newAnimalito(animalito) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO validar el dato... mejor si es a través de un validador (y limito responsabilidades)
            // Convertir el objeto que me dan: DatosAnimalitoDTO en el objeto que necesita la capa de persistencia: DatosAnimalito
            let datosAnimalito = this.mapeadorDeAnimalitos.toDatosAnimalito(animalito);
            // Guardar el animalito en la base de datos
            return this.intentar(() => __awaiter(this, void 0, void 0, function* () {
                let animalitoPersistido = yield this.repositorioDeAnimalitos.newAnimalito(datosAnimalito);
                // Enviar un email a una direccion de correo electronico
                this.servicioDeEmails.enviarEmail(this.DESTINATARIO, this.ASUNTO, this.MENSAJE + animalito.nombre);
                // Convertir el objeto que me da la capa de persistencia: DatosAnimalito en el objeto que necesita el cliente: AnimalitoDTO
                let animalitoDTO = this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
                // Notificar a los suscriptores
                this.notificar(tipo_notificacion_animalito_1.TipoNotificacionAnimalito.NEW, animalitoDTO);
                return animalitoDTO;
            }));
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.intentar(() => __awaiter(this, void 0, void 0, function* () {
                let animalitoPersistido = yield this.repositorioDeAnimalitos.get(id);
                if (animalitoPersistido)
                    return this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
                else
                    return undefined;
            }));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.intentar(() => __awaiter(this, void 0, void 0, function* () {
                let animalitoPersistido = yield this.repositorioDeAnimalitos.delete(id);
                let animalitoDTO = this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
                this.notificar(tipo_notificacion_animalito_1.TipoNotificacionAnimalito.DELETE, animalitoDTO);
                return animalitoDTO;
            }));
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.intentar(() => __awaiter(this, void 0, void 0, function* () {
                let animalitosPersistidos = yield this.repositorioDeAnimalitos.getAll();
                return Promise.resolve(animalitosPersistidos.map(animalito => this.mapeadorDeAnimalitos.toAnimalitoDTO(animalito)));
                //return Promise.resolve(animalitosPersistidos.map(this.mapeadorDeAnimalitos.toAnimalitoDTO));
            }));
        });
    }
    update(id, datosAModificarDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.intentar(() => __awaiter(this, void 0, void 0, function* () {
                let datosAModificar = this.mapeadorDeAnimalitos.toDatosAModificar(datosAModificarDTO);
                let animalitoPersistido = yield this.repositorioDeAnimalitos.update(id, datosAModificar);
                let animalitoDTO = this.mapeadorDeAnimalitos.toAnimalitoDTO(animalitoPersistido);
                this.notificar(tipo_notificacion_animalito_1.TipoNotificacionAnimalito.UPDATE, animalitoDTO);
                return animalitoDTO;
            }));
        });
    }
    subscribe(callback) {
        this.subscripciones.push(callback);
        return () => {
            this.subscripciones.splice(this.subscripciones.indexOf(callback), 1);
        };
    }
    intentar(codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Promise.resolve(yield codigo());
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    notificar(operacion, animalito) {
        let notificacion = Object.freeze({
            operacion: Object.freeze(operacion),
            animalito: Object.freeze(animalito)
        });
        this.subscripciones.forEach(notificar => notificar(notificacion));
    }
}
exports.AnimalitoServiceImpl = AnimalitoServiceImpl;
