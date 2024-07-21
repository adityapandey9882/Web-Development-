//import models 
const Post = require ("../models/postModel");
const Like = require("../models/likeModel");

//like a post 

exports.likePost = async (req,res) =>{
    try {
        const {post, user} = req.body;
        const like = new Like({
            post, user,
        });
        const savedLike = await like.save();


        //update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
                            .populate("likes")  //populate the comments array with comment documents
                            .exec();

        res.json ({
            post:updatedPost,
        });

    }
    catch (error){
        return res.status(400).json({
            Message: error.message
        });

    }
}

//Unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        // Find and delete the like
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        // Update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true });

        res.json({
            post: updatedPost,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};


