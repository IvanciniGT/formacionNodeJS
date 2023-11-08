import { Model, DataTypes } from 'sequelize';
import { Animalito } from '../animalito';
import { DatosAnimalito } from '../datos.animalito';
import { Sequelize, ModelCtor } from 'sequelize/types';

// configuración de los modelos que persistireoms a través de SEQUELIZE


let animalitoSequelizeRepository: ModelCtor<Model<Animalito, DatosAnimalito>>;

export function createAnimalitoSequelizeRepository(sequelize:Sequelize) {
    animalitoSequelizeRepository = sequelize.define<Model<Animalito,DatosAnimalito>>('Animalito', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        raza: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    animalitoSequelizeRepository.sync({ force: false }).then(() => {
        console.log("Tabla creada");
    });
    return animalitoSequelizeRepository;
}

export const AnimalitoSequelizeRepository = () => animalitoSequelizeRepository;
