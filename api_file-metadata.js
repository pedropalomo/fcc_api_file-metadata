var express =   require("express");
var multer  =   require('multer');
const http = require('http');
var app         =   express();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        
        console.log({ size: req.file.size });
        res.json({ size: req.file.size });
    });
});

app.listen(process.env.PORT || 8080,function(){
    console.log("Working on port", process.env.PORT || 8080);
});

