var express=require('express');
var controller=require('./controller');
var app=express();
const mongoose=require('mongoose');





app.set('view engine','ejs');


app.use(express.static('./public'));

controller(app);
app.listen(3000);
