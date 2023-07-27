const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const morgan = require('morgan');
const path = require("path");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const { router } = require('./router/router');
const MongodbConnection = require('./utils/database-utils/mongodb.connection');

module.exports = class Application {
    #app = express();
    #PORT;
    constructor(PORT) {
        this.#PORT = PORT;
        this.#app.unsubscribe(cors());
        this.configApplication();
        this.connectToMongoDB();
        this.initRedis();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }

    configApplication = () => {
        this.#app.use(morgan('dev'));
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.json());
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: 'Simple shop',
                    version: "0.1.0",
                    description: 'Simple shop description',
                    contact: {
                        name: 'Ehsan Moallaee',
                        url: 'https://github.com/EhsanMoallaee',
                        email: 'ehsanm78@gmail.com',
                    },
                },
                servers: [
                    {
                    url: `http://localhost:${this.#PORT}`,
                    },
                ],
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',                            
                        }
                    }
                },
                security: [{ BearerAuth : [] }]
            },
            apis: ['./app/router/*/*.js'],
        };
        const specs = swaggerJsDoc(options);
        this.#app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));
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

    initRedis = () => {
        require('./utils/initRedis');
    }

    createRoutes = () => {
        this.#app.use(router);
    }

    errorHandling = () => {
        this.#app.use((req, res, next) => {
            next(createError.NotFound('Requested page not found!'));
        });

        this.#app.use((err, req, res, next) => {
            console.log(err.message);
            const serverError = createError.InternalServerError('Internal server error occured')
            const statusCode = err.status || serverError.statusCode;
            const message = err.message || serverError.message;
            return res.status(statusCode).json({
                error: {
                    statusCode,
                    message
                }
            })
        })
    }
}
