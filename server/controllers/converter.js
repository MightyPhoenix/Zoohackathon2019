const express = require('express');
const router = express.Router();

//upload = require("express-fileupload");

//app.use(upload());

router.get('/',(req,res)=>{
    res.sendFile(__dirname+"/html/upload.html");
});

router.post("/",(req,res)=>{
    if(req.files){
        console.log(req.files)
        var file = req.files.files,
        

            filename = "content.pdf";
        
        file.mv("./files/pdf/"+filename,(err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("Done......");
            }
        });
    }
});

router.get("/upload",(req,res)=>{
    var convertapi = require('convertapi')("rVBjazbczAOdWe9M");
    convertapi.convert('txt', {
        File: './files/pdf/content.pdf'
        }, 'pdf').then(function(result) {
    result.saveFiles('./files/text');
    });
});


module.exports = router;