const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000

//middleware to interact with JSON file
app.use(express.json());

//simple express middleware for uplaoding files.
const fileupload = require("express-fileupload");
app.use(fileupload()); 

//connect with Database
require("./config/database").connect();

//connect with cloud
const cloudinary = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();


//import routes
const FileUpload = require("./routes/FileUpload");
//api route mount 
app.use("/api/v1/upload", FileUpload);


app.listen(PORT, () =>{
    console.log(`App running successfully a Port no ${PORT}`)
})

app.get("/", (req, res) =>{
    res.send("This is the home page")
})