const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StatusSchema = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// StatusSchema.sync();

module.exports = StatusSchema;