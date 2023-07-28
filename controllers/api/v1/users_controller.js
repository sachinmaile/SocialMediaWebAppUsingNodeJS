const User=require('../../../models/user');

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()) return res.redirect('/api/v1/users/profile');
    return res.render('user_sign_up',{title:'User SignUp'});
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{title:'User SignIn'});
}

module.exports.create=async (req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    await User.findOne({email:req.body.email})
    .then((user)=>{
        if(!user){
            User.create(req.body)
            .then((user)=>{
                return res.redirect('/api/v1/users/signIn');
            })
            .catch((err)=>{
                console.log('Error in creating user while signing up');
                return;
            });
        }
        else{
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.log('Error in fetching user in signing up');
        return;
    });
}

module.exports.createSession=function (req,res){
    // User.findOne({email:req.body.email})
    // .then((user)=>{
    //     if(user){
    //         if(user.password!=req.body.password){
    //             return  res.redirect('back');
    //         }
    //         res.cookie('user_id',user._id);
    //         return res.redirect('/');
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })
    // .catch((err)=>{
    //     if(err){
    //         console.log('Error in finding user in signing in');
    //         return;
    //     }
    // })
    req.flash('success','Logged in Successfully');
    return res.redirect('/api/v1/');
}

// module.exports.profile= function (req,res){
//     if(req.cookie.user_id){
//         User.findById(req.cookie.user_id)
//         .then((user)=>{
//             if(user) return res.render('user_profile',{title:'User Profile',user:user});
//             else return res.redirect('/users/signIn');
//         })
//         .catch((err)=>{
//             if(err){
//                 console.log('Error in finding profile');
//                 return;
//             }
//         })
//     }
//     else return res.redirect('/users/signIn');
// }

module.exports.profile=async (req,res)=>{
    await User.findById(req.params.id)
    .then((user)=>{
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        });
    });
}

module.exports.update=async (req,res)=>{
    if(req.user.id == req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****Multer Error :',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){ console.log('Error',err)}
    });
    req.flash('success','Logged out Successfully');
    return res.redirect('/api/v1/');
}