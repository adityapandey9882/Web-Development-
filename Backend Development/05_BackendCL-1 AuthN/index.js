//Import Express.js
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

// const connectWithDb = require("./config/database");
// connectWithDb();

require("./config/database").connectWithDb();

//Import routes
const user = require("./routes/user");
//mount 
app.use("/api/v1", user)

app.listen(PORT, () => {
    console.log(`App running Successfully at Port No ${PORT}`)
})