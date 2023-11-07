import { Sequelize, Dialect, Options } from 'sequelize';

// Configuración SEQUELIZE. Conectar SEQUELIZE a mi BBDD Mysql

let sequelize:Sequelize;

export function configSequelize( config: Options = {} ):Sequelize {
    config ={ 
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT as Dialect || 'mysql',
        port: parseInt(process.env.DB_PORT || '3306'),
        ...config
    }
    console.log("Conectando a la BBDD", config);
    sequelize = new Sequelize(config)
    console.log("Conectado a la BBDD", sequelize);
    return sequelize;
}

