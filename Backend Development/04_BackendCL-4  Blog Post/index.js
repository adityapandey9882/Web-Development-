// import 
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.port || 5000;

//middleware
app.use(express.json());

const blog = require("./routes/blog")
//mount 
app.use("/api/v1", blog);

// connect to the database
const connectWithDb = require("./config/database");
connectWithDb();

// start server 
app.listen(PORT, () =>{
    console.log(`App is running Successfully at ${PORT}`)
})

//default port 
app.get("/", (req,res) => {
    res.send(`<h1>This is the home page Brother</h1>`)
})