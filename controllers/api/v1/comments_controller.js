const Comment=require('../../../models/comment');
const Post=require('../../../models/post');

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
            res.redirect('/api/v1');
        })
    });
}

module.exports.destroy = async (req,res)=>{
    await Comment.findById(req.params.id)
    .then((comment)=>{
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
            .then(()=>{
                return res.redirect('/api/v1');
            });
        }
    });
} 