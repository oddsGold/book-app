const BookModel = require('../models/book-model');
const StatusModel = require('../models/status-model');
const ApiError = require('../exeptions/api-error');
const UserModel = require("../models/user-model");
const UserDto = require("../dtos/user-dto");

class BookService {
    async addBook(email, title, author, publish_year, pages_total) {
        try {
            const user = await UserModel.findOne({ where: { email: email } });
            if(!user) {
                throw ApiError.BadRequest('Пользователь с таким email не был найден');
            }
            const userDto = new UserDto(user);

            // Создаем новую книгу с переданными данными
            const newBook = await BookModel.create({user_id: userDto.id, title, author, publish_year: publish_year, pages_total: pages_total });

            const bookWithStatus = await BookModel.findOne({
                where: { id: newBook.id },
                include: [{
                    model: StatusModel,
                    required: true
                }]
            });

            // Возвращаем данные добавленной книги
            return bookWithStatus;
        } catch (error) {
            // Если произошла ошибка при добавлении книги, выбрасываем исключение ApiError
            throw ApiError.InternalServerError('Failed to add book', error);
        }
    }

    async getAllBooks() {
        try {
            const booksWithStatuses = await BookModel.findAll({
                include: [{
                    model: StatusModel,
                    required: true
                }]
            })
            return booksWithStatuses;
        }catch (error) {
            console.error('Failed to get books with statuses:', error);
            throw error;
        }
    }

    // Другие методы сервиса (например, для получения списка книг, обновления книги и т. д.) могут быть добавлены здесь
}

module.exports = new BookService();