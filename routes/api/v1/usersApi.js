const express=require('express');
const router=express.Router();
const usersApi=require('../../../controllers/api/v1/users_api');
const passport = require('passport');

router.post('/create_session',usersApi.createSession);

module.exports=router;