const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async (req,res)=>{
    await Post.findById(req.body.post)
    .then((post)=>{
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        }).then((comment)=>{
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        })
    });
}