"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalitoSequelizeRepository = exports.createAnimalitoSequelizeRepository = void 0;
const sequelize_1 = require("sequelize");
// configuración de los modelos que persistireoms a través de SEQUELIZE
let animalitoSequelizeRepository;
function createAnimalitoSequelizeRepository(sequelize) {
    animalitoSequelizeRepository = sequelize.define('Animalito', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        raza: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        }
    });
    animalitoSequelizeRepository.sync({ force: false }).then(() => {
        console.log("Tabla creada");
    });
    return animalitoSequelizeRepository;
}
exports.createAnimalitoSequelizeRepository = createAnimalitoSequelizeRepository;
const AnimalitoSequelizeRepository = () => animalitoSequelizeRepository;
exports.AnimalitoSequelizeRepository = AnimalitoSequelizeRepository;
