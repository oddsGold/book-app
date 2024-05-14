const { Sequelize } = require('sequelize');

const config =  {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "",
    DB: "book_app",
    PORT: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    port: config.PORT,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
    define: {
        timestamps: false
    }
});

module.exports = sequelize;