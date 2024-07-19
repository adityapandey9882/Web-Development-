const mongoose = require("mongoose");

// construct schema 
const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:50,
        },
        description: {
            type:String,
            required:true,
            maxLength:50,
        },
        creatAt: {
            type:Date,
            required:true,
            default:Date.now(),
        },
        updateAt: {
            type:Date,
            require:true,
            default:Date.now(),
        }
    }
);

module.exports = mongoose.model("Todo", todoSchema);   //export schema 