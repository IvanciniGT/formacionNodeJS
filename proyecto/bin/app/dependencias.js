"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalitosWebSocket = exports.EnrutadorControladorRestV1DeAnimalitos = exports.getAnimalitosController = exports.getMapeadorDeAnimalitosController = exports.getAnimalitosService = exports.getMapeadorDeAnimalitoService = exports.getEmailService = exports.getAnimalitosRepository = exports.SequelizeInstance = void 0;
const animalito_controller_v1_impl_1 = require("../controller/rest/v1/impl/animalito.controller.v1.impl");
const animalitos_router_v1_1 = require("../controller/rest/v1/impl/animalitos.router.v1");
const animalitos_mapper_impl_1 = require("../controller/rest/v1/impl/mapper/animalitos.mapper.impl");
const animalito_repository_mysql_impl_1 = require("../persistence/repository/impl/animalito.repository.mysql.impl");
const animalitos_service_impl_1 = require("../service/impl/animalitos.service.impl");
const email_service_impl_1 = require("../service/impl/email.service.impl");
const animalitos_mapper_impl_2 = require("../service/impl/mapper/animalitos.mapper.impl");
const animalito_ws_impl_1 = require("../controller/ws/animalito.ws.impl");
const sequelize_config_1 = require("./sequelize.config");
exports.SequelizeInstance = (0, sequelize_config_1.configSequelize)();
let animalitosRepository = new animalito_repository_mysql_impl_1.AnimalitoRepositoryImpl();
function getAnimalitosRepository() {
    return animalitosRepository;
}
exports.getAnimalitosRepository = getAnimalitosRepository;
let emailService = new email_service_impl_1.EmailsServiceImpl();
function getEmailService() {
    return emailService;
}
exports.getEmailService = getEmailService;
let mapeadorDeAnimalitos = new animalitos_mapper_impl_2.MapeadorDeAnimalitosImpl();
function getMapeadorDeAnimalitoService() {
    return mapeadorDeAnimalitos;
}
exports.getMapeadorDeAnimalitoService = getMapeadorDeAnimalitoService;
let servicioDeAnimalitos = new animalitos_service_impl_1.AnimalitoServiceImpl(getAnimalitosRepository(), getEmailService(), getMapeadorDeAnimalitoService()); // Inyección de dependencias
function getAnimalitosService() {
    return servicioDeAnimalitos;
}
exports.getAnimalitosService = getAnimalitosService;
let mapeadorDeAnimalitosController = new animalitos_mapper_impl_1.MapeadorDeAnimalitosV1Impl();
function getMapeadorDeAnimalitosController() {
    return mapeadorDeAnimalitosController;
}
exports.getMapeadorDeAnimalitosController = getMapeadorDeAnimalitosController;
let controladorDeAnimalitos = new animalito_controller_v1_impl_1.AnimalitoControllerV1Impl(getMapeadorDeAnimalitosController(), getAnimalitosService()); // Inyección de dependencias
function getAnimalitosController() {
    return controladorDeAnimalitos;
}
exports.getAnimalitosController = getAnimalitosController;
exports.EnrutadorControladorRestV1DeAnimalitos = new animalitos_router_v1_1.AnimalitoRouterV1(getAnimalitosController()); // Inyección de dependencias
exports.AnimalitosWebSocket = new animalito_ws_impl_1.AnimalitoWSImpl(getAnimalitosService()); // Inyección de dependencias
