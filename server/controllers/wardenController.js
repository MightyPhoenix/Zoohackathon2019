//Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Models

const User = mongoose.model('User');
const Warden = mongoose.model('Warden');
const Owner = mongoose.model('Owner');
const ElephantCreateRequest = mongoose.model('ElephantCreateRequest');
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
    Owner.findOneAndUpdate({_id : id},{
        accountVerified : true
    },function(err,doc){
        if(err) throw err;
        res.redirect('/dashboard');
    });
});

router.get('/add-elephant',function(req,res){
    res.render('Warden/addElephant');
});

router.get('check-add-elephant',function(req,res){
    res.render('Warden/checkAddElephant');
});

router.post('/add-elephant',function(req,res){
    
})
module.exports  = router;