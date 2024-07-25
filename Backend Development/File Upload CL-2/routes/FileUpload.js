const express = require("express");
const router = express.Router();

//controller handler
const {localFileUpload, imageUpload, videoUpload ,imageSizeReducer} = require("../controllers/fileUpload");


//create mapping 
router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/videoUpload" , videoUpload);
router.post("/imageSizeReducer" , imageSizeReducer);

module.exports = router;