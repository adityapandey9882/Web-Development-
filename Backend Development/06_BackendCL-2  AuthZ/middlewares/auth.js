
//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res, next) => {
    try{
        //extract JWT token
        //PENDING: other ways to fetch token
        const token = req.body.token;

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        //verify the token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        
        }catch(error){
            return res.status(401).json({
                success:false,
                message:'Token is Invalid',
            })
        }
        next();

    }  catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, While verifying the token',
            message:error.message,
        });    
    }
}

exports.isStudent = (req,res,next) =>{
    try{
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a Protected route for students',
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is Not Matching',
            // message: error.message
        });
    }
}


exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'This is a Protected route for admin',
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            // message:'User Role is Not Matching',
            message:error.message,
        });
    }
}