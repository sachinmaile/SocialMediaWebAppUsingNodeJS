const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
const port=8000;
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.get('/',function(req,res){
    return res.render('home',{title:"Social Media Web App"});
})

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup! My Express server is running on port :', port);
})