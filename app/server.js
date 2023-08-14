const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require("path");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { router } = require('./router/router');
const MongodbConnection = require('./utils/database-utils/mongodb.connection');
const expressEjsLayouts = require('express-ejs-layouts');
const { initSocket } = require('./utils/initSocket');
const { socketHandler } = require('./socket.io');
require('dotenv').config();

module.exports = class Application {
    #app = express();
    #PORT;
    constructor(PORT) {
        this.#PORT = PORT;
        this.#app.unsubscribe(cors());
        this.configApplication();
        this.initTemplateEngine();
        this.connectToMongoDB();
        this.initRedis();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }

    configApplication = () => {
        this.#app.use(helmet());
        this.#app.use(morgan('dev'));
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.json());
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
        const options = {
            definition: {
                openapi: "3.1.0",
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
            apis: ['./app/router/**/*.js'],
        };
        const specs = swaggerJsDoc(options);
        this.#app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));
    }

    createServer = () => {
        const http = require('http');
        const server = http.createServer(this.#app);
        const io = initSocket(server);
        socketHandler(io);
        server.listen(this.#PORT, () => {
            console.log(`Server is running on : http://localhost:${this.#PORT}`);
        })
    }

    connectToMongoDB = () => {
        MongodbConnection.getInstance();
    }

    initRedis = () => {
        require('./utils/initRedis');
    }

    initTemplateEngine = () => {
        this.#app.use(expressEjsLayouts);
        this.#app.set('views', 'resource/views');
        this.#app.set('view engine', 'ejs');
        this.#app.set('layout extractStyles', true);
        this.#app.set('layout extractScripts', true);
        this.#app.set('layout', './layouts/master');
    }

    createRoutes = () => {
        this.#app.use(router, async (err, req, res, next) => {
            if(err) next(err)
        });
    }

    errorHandling = () => {
        this.#app.use((req, res, next) => {
            next(createError.NotFound('Requested page not found!'));
        });

        this.#app.use((err, req, res, next) => {
            // console.log(err);
            // console.log('-------------------------------------');
            console.log(err.message);
            const serverError = createError.InternalServerError('Internal server error occured')
            const statusCode = err.status || serverError.statusCode;
            const message = err.message || serverError.message;
            return res.status(statusCode).json({
                error: {
                    statusCode,
                    success: false,
                    message
                }
            })
        })
    }
}
