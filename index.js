const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const app=express();
const cookieParser=require('cookie-parser');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup! My Express server is running on port :', port);
})