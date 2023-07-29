const express=require('express');
const router=express.Router();
const homeController=require('../../../controllers/api/v1/home_controller');
const passport = require('passport');
console.log('router loaded');

router.get('/',passport.checkAuthentication,homeController.home);
router.use('/users',require('./user'));
router.use('/usersApi',require('./usersApi'));
router.use('/posts',require('./post'));
router.use('/postsApi',require('./postsApi'));
router.use('/comments',require('./comment'));

module.exports=router;