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
exports.AnimalitoSequelizeRepository = exports.createAnimalitoSequelizeRepository = void 0;
const sequelize_1 = require("sequelize");
// configuración de los modelos que persistireoms a través de SEQUELIZE
let animalitoSequelizeRepository;
function createAnimalitoSequelizeRepository(sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
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
        animalitoSequelizeRepository.sync({ force: true }).then(() => {
            console.log("Tabla creada");
        });
        return animalitoSequelizeRepository;
    });
}
exports.createAnimalitoSequelizeRepository = createAnimalitoSequelizeRepository;
const AnimalitoSequelizeRepository = () => animalitoSequelizeRepository;
exports.AnimalitoSequelizeRepository = AnimalitoSequelizeRepository;
