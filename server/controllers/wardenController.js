//Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Models

const User = mongoose.model('User');
const Warden = mongoose.model('Warden');
const Owner = mongoose.model('Owner');
//Routes

router.get('/approve',function(req,res){
    var wardenEmail = req.user.username;
    Warden.findOne({email : wardenEmail},function(err,doc){
        if(err) throw err;
        //console.log(req.user.username);
        //console.log(doc.state);
         let wardenState = doc.state;
         Owner.find({
             state : wardenState,
             accountVerified : false
         },function(err,doc1){
             if(err) throw err;
             console.log(doc1);
             res.render('Warden/approveList',{list : doc1});
         });
    });
});


router.post('/approveUser',function(req,res){
    let id = req.body._id;
    Owner.findOneAndUpdate({});
});

module.exports  = router;