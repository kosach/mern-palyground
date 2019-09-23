const mongoose = require('mongoose');
const config = require('config');
const db = config.get('db');

const connectDB = async () => {
    const username = process.env.DB_USERNAME || db.username;
    const password = process.env.DB_PASSWORD || db.password;
    const host     = process.env.DB_HOST     || db.host;
    const database = process.env.DB_DATABASE || db.database;
    const port     = process.env.DB_PORT     || db.port;
    try{
        mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(`Mongodb connected...`)
    } catch (err){
        console.error(err.message);
    }
}

module.exports = connectDB;
