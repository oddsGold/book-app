const { DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../config/database');
const User = require("./user-model");
const Status = require("./status-model");

const BookSchema = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status_id:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publish_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true,
            min: 1000,
            max: new Date().getFullYear(),
        }
    },
    pages_total: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false, // Отключаем автоматическое обновление created_at и updated_at
    hooks: {
        beforeUpdate: (book, options) => {
            book.updated_at = new Date(); // Устанавливаем текущую дату перед обновлением
        }
    }
});

BookSchema.belongsTo(User, { foreignKey: 'user_id' });
BookSchema.belongsTo(Status, { foreignKey: 'status_id' });

// Создаем таблицу в базе данных на основе модели
// BookSchema.sync();

module.exports = BookSchema;