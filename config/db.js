const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
console.log('TCL: db', db)

const connectDB = async () => {
    try{
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  });
        console.log(`Mongodb connected...`)
    } catch (err){
        console.error(err.message);
    }
}

module.exports = connectDB;
