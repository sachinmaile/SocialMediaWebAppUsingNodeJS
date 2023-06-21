const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_controller');
router.get('/signUp',userController.signUp);
router.get('/signIn',userController.signIn);
router.get('/profile',userController.profile);
router.post('/create',userController.create);
router.post('/create-session',userController.createSession);
module.exports=router;