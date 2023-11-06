"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimalitosController = exports.getMapeadorDeAnimalitosController = exports.getAnimalitosService = exports.getMapeadorDeAnimalitoService = exports.getEmailService = exports.getAnimalitosRepository = void 0;
const animalito_controller_v1_impl_js_1 = require("../controller/rest/v1/impl/animalito.controller.v1.impl.js");
const animalitos_mapper_impl_js_1 = require("../controller/rest/v1/impl/mapper/animalitos.mapper.impl.js");
const animalito_repository_impl_js_1 = require("../persistence/repository/impl/animalito.repository.impl.js");
const animalitos_service_impl_js_1 = require("../service/impl/animalitos.service.impl.js");
const email_service_impl_js_1 = require("../service/impl/email.service.impl.js");
const animalitos_mapper_impl_js_2 = require("../service/impl/mapper/animalitos.mapper.impl.js");
let animalitosRepository = new animalito_repository_impl_js_1.AnimalitoRepositoryImpl();
function getAnimalitosRepository() {
    return animalitosRepository;
}
exports.getAnimalitosRepository = getAnimalitosRepository;
let emailService = new email_service_impl_js_1.EmailsServiceImpl();
function getEmailService() {
    return emailService;
}
exports.getEmailService = getEmailService;
let mapeadorDeAnimalitos = new animalitos_mapper_impl_js_2.MapeadorDeAnimalitosImpl();
function getMapeadorDeAnimalitoService() {
    return mapeadorDeAnimalitos;
}
exports.getMapeadorDeAnimalitoService = getMapeadorDeAnimalitoService;
let servicioDeAnimalitos = new animalitos_service_impl_js_1.AnimalitoServiceImpl(getAnimalitosRepository(), getEmailService(), getMapeadorDeAnimalitoService());
function getAnimalitosService() {
    return servicioDeAnimalitos;
}
exports.getAnimalitosService = getAnimalitosService;
let mapeadorDeAnimalitosController = new animalitos_mapper_impl_js_1.MapeadorDeAnimalitosV1Impl();
function getMapeadorDeAnimalitosController() {
    return mapeadorDeAnimalitosController;
}
exports.getMapeadorDeAnimalitosController = getMapeadorDeAnimalitosController;
let controladorDeAnimalitos = new animalito_controller_v1_impl_js_1.AnimalitoControllerV1Impl(getMapeadorDeAnimalitosController(), getAnimalitosService());
function getAnimalitosController() {
    return controladorDeAnimalitos;
}
exports.getAnimalitosController = getAnimalitosController;
