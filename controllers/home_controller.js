const Post=require('../models/post');
module.exports.home=async (req,res)=>{
    await Post.find({}).populate('user').exec()
    .then((posts)=>{
        return res.render('home',{title:'SocialMediaWebApp|Home',posts:posts});
    });
}