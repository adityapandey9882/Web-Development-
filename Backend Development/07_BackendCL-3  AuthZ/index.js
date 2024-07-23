//Import Express.js
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//Import cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("./config/database").connectWithDb();

// const connectWithDb = require("./config/database");
// connectWithDb();

//Import routes
const user = require("./routes/user");
//mount 
app.use("/api/v1", user)

app.listen(PORT, () => {
    console.log(`App running Successfully at Port No ${PORT}`)
})