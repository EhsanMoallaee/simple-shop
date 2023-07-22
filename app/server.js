const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const { router } = require('./router/router');

module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT , DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }

    configApplication = () => {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
    }

    createServer = () => {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`Server is running on : http://localhost:${this.#PORT}`);
        })
    }

    connectToMongoDB = () => {
        mongoose.connect(this.#DB_URI)
        .then(() => {
            console.log('Connected to mongoDB successfully');
        })
        .catch((err) => {
            if (err) return console.log('MongoDB connection err : ', err.message);
        });
    }

    createRoutes = () => {
        this.#app.use(router);
    }

    errorHandling = () => {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode: 404,
                message: 'Requested page not found!'
            })
        });

        this.#app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            const message = err.message || 'Internal server error occured'
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}
