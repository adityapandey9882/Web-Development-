//Import bcrypt
const bcrypt = require("bcrypt");
const User = require("../models/User");

//signup route handler
exports.signup = async (req,res) =>{
    try{
        //get data 
        const {name, email, password , role } = req.body;
        //check if user already exist 
        const exitingUser = await User.findOne({email});

        if(exitingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }
        //secure password 
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }
        
        //create entry for User in DB 
        
        // const user = await User.create({
        //     name,email,password:hashedPassword,role
        // })
                //Or create Object 
        const user = new User({
        name,email,password:hashedPassword,role
    })
    //save  the new user into the database 
    const saveduser = await user.save();
    
    return res.status(200).json({
        success:true,
        message:'User created Successfully',
    });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false, 
            message:error.message,
            // message: 'User cannot be registered, please try again later',
        });
    }
}

//login handler

exports.login = async (req,res) =>{
    try{
         //get data from request body
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill the details carefully'
            });
        }
        //check user is register or not in database 
        let user = await User.findOne({email});
        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message: "User is not registered",
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };


        //verfiy password & generate a JWT Token
        if(await bcrypt.compare(password, user.password) ) {
            //password matched
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET ,
                            {
                                expiresIn:"2h",
                            });
    
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 10000),
                httpOnly:true,
            
            }


            res.cookie("Cookies2", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });
            
        }
        else {
            //password do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            })
        }
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
   
}

