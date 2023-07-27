const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.create=async (req,res)=>{
    try{
        let post=await Post.create({
            content: req.body.content,
            user:req.user._id
        });
        if(req.xhr) {
            return res.status(200).json({
                data:{post:post},
                message:"Post Created!"
            });
        }
        return res.redirect('back');
    }
    catch(err){
        console.log('Error in creating a post');
        return;
    }
}

module.exports.destroy=async (req,res)=>{
    await Post.findById(req.params.id)
    .then((post)=>{
        if(post.user == req.user.id){
            post.deleteOne()
            Comment.deleteMany({post:req.params.id})
            .catch((err)=>{
                return res.redirect('back');
            });
            if(req.xhr){
                return  res.status(200).json({
                    data:{post_id:req.params.id},
                    message:"Post deleted successfully"
                });
            }
        }
        else{
            return res.redirect('back');
        }
    })
}