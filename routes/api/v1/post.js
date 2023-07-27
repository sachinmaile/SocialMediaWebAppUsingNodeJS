const express=require('express');
const router=express.Router();
const postController=require('../../../controllers/api/v1/posts_controller');
const postsApi=require('../../../controllers/api/v1/posts_api');
const passport=require('passport');

router.post('/create',passport.checkAuthentication,postController.create);
// router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
router.get('/',postsApi.index);
router.delete('/destroy/:id',postsApi.destroy);

module.exports=router;