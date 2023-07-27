const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    avatar:{type:String}
},{timestamp:true});

let storage=multer.diskStorage({})
const User=mongoose.model('User',userSchema);
module.exports=User;