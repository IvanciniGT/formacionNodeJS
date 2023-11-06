"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dependencias_1 = require("./dependencias");
dotenv.config();
function getExpressPort() {
    return parseInt(process.env.PORT || '8080');
}
function getExpressServer() {
    const app = (0, express_1.default)();
    // Metemos toda la configuración del express
    app.use(express_1.default.json()); // Para que el body de las peticiones se convierta a JSON
    app.use(express_1.default.urlencoded({ extended: true })); // La codificación de los params del queryString del la URL
    app.use((0, cors_1.default)());
    // Metemos los enrutadores
    app.use('/api/v1/animalitos', dependencias_1.EnrutadorControladorRestV1DeAnimalitos.configureRouter());
    return app;
}
getExpressServer().listen(getExpressPort(), () => {
    console.log(`Servidor express escuchando en el puerto ${getExpressPort()}`);
});
// Backend lo tengo en el puerto 8080 del dominio: miapp.com:8080
// frontal lo tengo en el puerto 80 del dominio: miapp.com:80
// Los navegadores no permiten hacer peticiones a dominios distintos del que sirve la página
// El que sirve la página publica un listado de sitios que permiten hacer peticiones a su dominio (CORS)
// El navegador en base a ese listado puede decidir no proceder a la ejecución de peticiones a un servidor desde uin js que
// se haya cargado en un dominio si éste es distinto del que servidor admite(CORS)
//Frontal: JS (miapp.com:80) 
//    fetch("miapp.com:8080/api/v1/animalitos")
// El navegador puede bloquear la invocación del http al backend... Por defecto la bloquea.
// Solo se permiten si el dominio es el mismo o trabajo con localhost
