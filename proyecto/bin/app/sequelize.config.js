"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSequelize = void 0;
const sequelize_1 = require("sequelize");
// Configuración SEQUELIZE. Conectar SEQUELIZE a mi BBDD Mysql
let sequelize;
function configSequelize(config = {}) {
    config = Object.assign({ database: process.env.DB_NAME, username: process.env.DB_USER, password: process.env.DB_PASS, host: process.env.DB_HOST || 'localhost', dialect: process.env.DB_DIALECT || 'mysql', port: parseInt(process.env.DB_PORT || '3306') }, config);
    console.log("Conectando a la BBDD", config);
    sequelize = new sequelize_1.Sequelize(config);
    console.log("Conectado a la BBDD", sequelize);
    return sequelize;
}
exports.configSequelize = configSequelize;
