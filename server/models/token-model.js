const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user-model');

const TokenSchema = sequelize.define('Token', {
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    refreshToken:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

TokenSchema.belongsTo(User, { foreignKey: 'userId' });

module.exports = TokenSchema;