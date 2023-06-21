const express=require('express');
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const app=express();
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name:'SocialMediaWebApp',
    secret:'blah',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000*60*5)}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup! My Express server is running on port :', port);
})