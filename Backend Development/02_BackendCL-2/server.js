// Server Instantiate
const express = require('express');
const app = express();


//used to parser req.body in express -> PUT or POST
const bodyParser = require('body-parser');

//Specifically parse JSON data & add it to the request.body object 
app.use(bodyParser.json());


//activate the server on any port number (like let port number 2000)
app.listen(3000, () => {
    console.log("Server started at port no 3000")
});


//Create Routes for request
app.get('/', (req,res) => {
    res.send("Hello Adiya Pandey")
});

app.get("/login", (req,res) =>{
    res.send(`<h1>You Entered in the Login Page</h1>`)
});

app.get("/link", (req,res) => {
    res.send(`<h2>This is the Home Page</h2>`)
})

///Routes for Post  //Use PostMan to communicate with API 
//So use Postman for Testing 
app.post('/api/car1', (request,response)=>{
    const{name, brand }= request.body;
    console.log(name);
    console.log(brand);
    response.send("Car Submitted successfully")
})


//MOngoDB is use to store data in form of document, key-value pair , graph etc
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewurlParser:true,
    useUnifiedTopology:true
})
.then(() => {console.log("DB connection Connection Successful")})
.catch(  (error) => {console.log("Recieved an error")});