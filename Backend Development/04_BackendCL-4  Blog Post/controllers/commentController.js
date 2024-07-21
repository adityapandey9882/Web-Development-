//import modle
const Post = require("../models/postModel");
//const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");

//business logic

exports.createComment = async(req, res) => {
    try {
        //fetch data from request ki body
        const {post, user, body} = req.body;
        //create a comment object 
        const comment = new Comment({
            post,user,body
        });

        //save the new comment into the database
        const savedComment = await comment.save();

        //Find the post by ID, and the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true} )
                            .populate("comments")  //populate the comments array with comment documents
                            .exec();
        res.json({
            post: updatedPost,
        });

    }
    catch ( error){
        return res.status(500).json({
            // error: "Eror While Creating comment",
            message: error.message
        });
    }
};

