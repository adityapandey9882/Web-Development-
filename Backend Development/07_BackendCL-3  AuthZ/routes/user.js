const express = require('express');
const router = express.Router();

const User = require("../models/User");


//Import Controller Handler
const{ login, signup} = require("../controllers/Auth");
const{ auth, isStudent, isAdmin  } = require("../middlewares/auth");

//create Mapping
router.post("/signup", signup);
router.post("/login", login);

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


router.get("/getEmail" , auth, async (req,res) => {
    try{
        const id = req.user.id;

        const user = await User.findById(id);
        res.status(200).json({
            success:true,
            user:user,
            message:'Welcome to the email route',
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            
        })
    }
})

module.exports = router;