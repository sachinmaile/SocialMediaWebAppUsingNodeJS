const Post=require('../models/post');
module.exports.create=async (req,res)=>{
    await Post.create({
        content: req.body.content,
        user:req.user._id
    }).then(()=>{
        return res.redirect('back');
    }).catch((err)=>{
        console.log('Error in creating a post');
        return;
    });
}