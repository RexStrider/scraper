const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost/new_db`, {useNewUrlParser: true});
const db = mongoose.connection;
const Schema = mongoose.Schema;

let news = new Schema({
    title: String,
    summary: String,
    link: String
});



db.on(`error`, error => {
    console.log(error);
});

db.once(`open`, () => {
    console.log(`connected!`);

    let Article = mongoose.model(`Article`, news);

    let article1 = new Article({title: "test"});
    article1.save(err => {
        if (err) throw err;
        console.log("saved!");
        mongoose.disconnect();
    });
});