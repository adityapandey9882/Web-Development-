//Import mongoose
const mongoose = require("mongoose");

require("dotenv").config();

exports.connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{console.log("DB connected Successfully")})
    .catch((err) => {
        console.log("DB CONNECTION ISSUES");
        console.error(err);
        process.exit(1)
    })
}

// module.exports = connectWithDb;