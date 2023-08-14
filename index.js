const Application = require('./app/server');
const PORT = process.env.PORT || 3000;

new Application(PORT);