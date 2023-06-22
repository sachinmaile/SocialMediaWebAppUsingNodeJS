const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_controller');
const passport = require('passport');

router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.post('/create',userController.create);
router.post('/create_session',passport.authenticate('local',{failureRedirect:'/users/signIn'}),userController.createSession);
router.get('/signOut',userController.destroySession);

module.exports=router;