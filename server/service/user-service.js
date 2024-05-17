const UserModel = require('../models/user-model')
const e = require("express");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exeptions/api-error');
class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ where: { email: email } });
        if(candidate) {
            throw ApiError.BadRequest(`Пользователь с таким адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({email, password: hashPassword, activationLink: activationLink});
        await mailService.sendActivationMail(email, `http://localhost:5000/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink){
        const user = await UserModel.findOne({where: {activationLink: activationLink}}); {

            if(!user){
                throw ApiError.BadRequest('Ошбика активации')
            }
            user.isActivated = true;
            await user.save();
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ where: { email: email } });
        if(!user) {
            throw ApiError.BadRequest('Пользователь с таким email не был найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password); //сравнение паролей (который ввели с тем который в БД)
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }


}

module.exports = new UserService();