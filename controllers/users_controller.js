module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{title:'User SignUp'});
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{title:'User SignIn'});
}