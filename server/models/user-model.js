const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const UserSchema = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isActivated:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    activationLink:{
        type: DataTypes.STRING
    }
});

module.exports = UserSchema;