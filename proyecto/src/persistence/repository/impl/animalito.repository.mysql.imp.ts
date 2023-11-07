import { Animalito } from "../../model/animalito";
import { DatosAnimalito } from "../../model/datos.animalito";
import { AnimalitoRepository } from "../animalito.repository";
import { Sequelize, Model, DataTypes } from 'sequelize';


// Configuración SEQUELIZE. Conectar SEQUELIZE a mi BBDD Mysql
export const sequelize = new Sequelize({
    database: 'animalitos',
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'mysql',
})

// configuración de los modelos que persistireoms a través de SEQUELIZE
const AnimalitoSequelizeRepository = sequelize.define<Model<Animalito,DatosAnimalito>>('Animalito', {
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

AnimalitoSequelizeRepository.sync({ force: true }).then(() => {
    console.log("Tabla creada");
});

// Implementar nuestro repositorio de animalitos
export class AnimalitoRepositoryImpl implements AnimalitoRepository {

    private validarAnimalito(animalito: DatosAnimalito){
        if(!animalito.nombre  || animalito.nombre === "") throw new Error("Nombre vacio");
        if(!animalito.raza  || animalito.raza === "") throw new Error("Raza vacia");
        if(animalito.edad<0) throw new Error("Edad negativa");
    }

    async newAnimalito(animalito: DatosAnimalito): Promise<Animalito> {
        try{
            this.validarAnimalito(animalito);
        }catch(error){
            return Promise.reject(error);
        }
        const promesa = new Promise<Animalito>((resolve, reject) => {
            AnimalitoSequelizeRepository.create(animalito).then(
                (animalito) => resolve(animalito.dataValues),
            )
        });
        return promesa;
    }
    get(id: number): Promise<Animalito | undefined> {
        return Promise.reject("Not implemented");
    }
    delete(id: number): Promise<Animalito> {
        return Promise.reject("Not implemented");
    }
    getAll(): Promise<Animalito[]> {
        return Promise.reject("Not implemented");
    }
    update(id: number, animalito: Partial<DatosAnimalito>): Promise<Animalito> {
        return Promise.reject("Not implemented");
    }

}