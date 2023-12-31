const express=require('express');
const router=express.Router();
const userController=require('../../../controllers/api/v1/users_controller');
const usersApi=require('../../../controllers/api/v1/users_api');
const passport = require('passport');

router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.post('/create',userController.create);
router.post('/create_session',passport.authenticate('local',{failureRedirect:'/api/v1/users/signIn'}),userController.createSession);
router.post('/create_session',usersApi.createSession)
router.get('/signOut',userController.destroySession);

module.exports=router;