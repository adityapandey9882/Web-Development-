const express = require('express');
const router = express.Router();


//Import Controller Handler
const{ login, signup} = require("../controllers/Auth");

//create Mapping
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;