require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware); //обработчик ошибок должен подключаться последним
const start = async () => {
    try {

        await connection.connect((err) => {
            if (err) {
                console.error('Ошибка подключения к базе данных: ' + err.stack);
                return;
            }
            console.log('Успешное подключение к базе данных');
        });

        app.listen(PORT, () => {
            console.log(`Server started on port = ${PORT}`)})
    }catch (e){
        console.log(e);
    }
}

start();