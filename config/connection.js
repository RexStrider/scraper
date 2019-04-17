const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost/nytscraper_db`, {useNewUrlParser: true});
const db = mongoose.connection;

db.on(`error`, error => {
    console.log(error);
});

db.once(`open`, () => {
    console.log(`connected!`);
});

module.exports = db;