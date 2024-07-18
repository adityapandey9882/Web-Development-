// Server Instantiate
const express = require('express');
const app = express();
const PORT = 3000


//activate the server on any port number (like let port number 2000)
app.listen(PORT, () => {
    console.log("Server started at port no 3000")
});


//Create Routes for request
app.get('/', (req,res) => {
    res.send("Hello Adiya Pandey")
});

app.get("/login", (req,res) =>{
    res.send(`<h1>You are entered in the Login Page</h1>`)
});

app.get("/link", (req,res) => {
    res.send(`<h2>This is the Home Page</h2>`)
})
