const mongoose = require("mongoose");

require("dotenv").config();   //all define value load in process object.

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then (() => console.log("DB ka Connection is Successful"))
    .catch(( error) =>{
        console.log("Issue in DB Connection");
        console.error(error.message);
        process.exit(1)
    });
}

module.exports = dbConnect;