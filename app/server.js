const express = require('express');
const path = require("path");
const { router } = require('./router/router');
const morgan = require('morgan');
const MongodbConnection = require('./utils/database-utils/mongodb.connection');

module.exports = class Application {
    #app = express();
    #PORT;
    constructor(PORT) {
        this.#PORT = PORT;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }

    configApplication = () => {
        this.#app.use(morgan('dev'));
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
        MongodbConnection.getInstance();
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
