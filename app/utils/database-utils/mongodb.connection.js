const mongoose = require('mongoose');

module.exports = class MongodbConnection {
    static instance;
    #DB_URI = process.env.DB_URI;

    constructor() {
        mongoose.connect(this.#DB_URI)
        .catch((err) => {
            if (err) return console.log('MongoDB connection err : ', err.message);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnectred from DB');
        })
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection connected to DB successfully');
        })
    }

    static getInstance() {
        if( this.instance ) {
            return this.instance;
        }
        this.instance = new MongodbConnection();
        return this.instance;
    }
}
