const express = require("express");
const router = express.Router();

//controller handler
const {localFileUpload} = require("../controllers/fileUpload");


//create mapping 
router.post("/localFileUpload" , localFileUpload);

module.exports = router;
