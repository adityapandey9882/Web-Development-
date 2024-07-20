//Import mongoose
const mongoose = require("mongoose");

// route handler
const likeSchema = new mongoose.Schema ({
    post: {
        type: String,
        ref: "Post", // reference to the post model
    },
    user: {
        type: String,
        required: true,
    },
});

//export 
module.exports = mongoose.model("Like", likeSchema);