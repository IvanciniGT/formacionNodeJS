import express from 'express';

import * as dotenv from 'dotenv';
import cors from 'cors';
import { EnrutadorControladorRestV1DeAnimalitos } from './dependencias';

dotenv.config();

function getExpressPort(): number {
    return parseInt(process.env.PORT || '8080');
}

function getExpressServer(){
    const app = express();
    // Metemos toda la configuración del express
    app.use(express.json());    // Para que el body de las peticiones se convierta a JSON
    app.use(express.urlencoded({extended: true})); // La codificación de los params del queryString del la URL
    app.use(cors())
    // Metemos los enrutadores
    app.use('/api/v1/animalitos', EnrutadorControladorRestV1DeAnimalitos.configureRouter());
    return app;
}

getExpressServer().listen(getExpressPort(), ()=>{
    console.log(`Servidor express escuchando en el puerto ${getExpressPort()}`);
})


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