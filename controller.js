var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const fs=require('fs');
const Schema=mongoose.Schema;
//connecting
mongoose.connect('mongodb://localhost:27017/test', {
useUnifiedTopology: true,
useNewUrlParser: true,
});
mongoose.connection.once('open',function() {
  console.log('connection made');
}).on('error',function(error){
  console.log('connection failed');
});
//schema

const loginschema=new Schema({
  name:String,
  password:String,

});
const imageschema=new Schema({
  contentType: String,
  path: String,
  image: Buffer,
});
const log2=mongoose.model('log2',imageschema);
const log=mongoose.model('log',loginschema);


module.exports=function(app){
app.use(bodyParser.urlencoded({extended:true}));

var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'upload/')
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname +'-'+ Date.now()+path.extname(file.originalname))
  }
})
var upload=multer({
  storage:storage
})

  app.get('/',function(req,res){
    res.render('login');
  });

  app.post('/',upload.single('filename'),function(req,res){
    var img=fs.readFileSync(req.file.path);
    var encode_image=img.toString('base64');

    var finalImg={
      contentType:req.file.mimetype,
      path:req.file.path,
      image:new Buffer(encode_image,'base64'),
    };
    var name=req.body.uname;
    var pass=req.body.psw;
    var finaltext={
      name:name,
      password:pass,
    };
    var text=log(finaltext).save(function(err,data){
      if(err) throw err;
    });

    var img=log2(finalImg).save(function(err,data){
      if(err) throw err;
    });
    res.render('login');

  });



};
