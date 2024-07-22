const express = require('express');
const router = express.Router();


//Import Controller Handler
const{ login, signup} = require("../controllers/Auth");
const{ auth, isStudent, isAdmin  } = require("../middlewares/auth");


//testing protected routes for single middleware
router.get("/test", auth, (req,res) => {
    res.status(200).json({
        success:true,
        message:'Welcome to the Protected route for TEST',
    });
});
//Protected Route
router.get("/student", auth, isStudent, (req,res) => {
    res.status(200).json({
        success:true, 
        message:'Welcome to the Protected route for Students',
    });
});

router.get("/admin", auth, isAdmin, (req,res) => {
    res.status(200).json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});



//create Mapping
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;