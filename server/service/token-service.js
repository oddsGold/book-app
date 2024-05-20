const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model')
const {where} = require("sequelize");
class TokenService {
    generateToken(payload) {
        const accessToken  = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken  = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'});
        return{
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({where: {refreshToken: refreshToken}});
        return tokenData;
    }



    async saveToken(id, refreshToken) {
        const tokenData = await tokenModel.findOne({where: {userId: id}});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await tokenModel.create({userId: id, refreshToken});
    }


    async removeToken(refreshToken) {
        const tokenData = await tokenModel.destroy({where: {refreshToken: refreshToken}});
        return tokenData;
    }
}

module.exports = new TokenService();