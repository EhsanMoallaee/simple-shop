const Application = require('./app/server');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

new Application(PORT);