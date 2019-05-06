const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/nytscraper_db`;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const db = mongoose.connection;

db.on(`error`, error => {
    console.log(error);
});

db.once(`open`, () => {
    console.log(`connected!`);
});

module.exports = db;