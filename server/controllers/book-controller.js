const bookService = require('../service/book-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exeptions/api-error');
const userService = require("../service/user-service");

class BookController {
    async addBook(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }

            // Проверяем, что все необходимые данные пришли в теле запроса
            const { email, title, author, publish_year, pages_total } = req.body;

            if (!email || !title || !author || !publish_year || !pages_total) {
                return next(ApiError.BadRequest('Missing required fields'));
            }

            // Вызываем сервис для добавления книги в базу данных
            const bookData = await bookService.addBook(email, title, author, publish_year, pages_total);

            // Возвращаем успешный ответ
            return res.json(bookData);
        } catch (e) {
            next(e);
        }
    }

    async getBooksAndStatuses(req, res, next) {
        try{
            const books = await bookService.getAllBooks();
            return res.json(books);
        }catch (error) {
            next(e);
        }
    }
}

module.exports = new BookController();