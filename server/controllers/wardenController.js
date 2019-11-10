//Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//Models

const User = mongoose.model('User');
const Warden = mongoose.model('Warden');
const Owner = mongoose.model('Owner');
const Elephant = mongoose.model('ElephantData');
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

router.get('/test1',function(req,res){
    res.render('Warden/test1')
});

router.get('check-add-elephant',function(req,res){
    res.render('Warden/checkAddElephant');
});


//POST
router.post('/add-elephant',function(req,res){
    var owner = req.body.owner;
    // let alias = req.body.alias;
    // //let elephantPic = req.files.ElephantImages;
    // lvar history = req.body.history;
    // let vet = req.body.v_check;

    let elephant = new Elephant({
        alias : "Babu Haathi",
        owner : "Santosh Mitra",
        history : "Bulbul Masi , 2019-2022",
        image : "/public/images/elephant0/pic.jpg",
        v_check : "Perfectly Healthy, Safe for Travel"
    });
    elephant.save((err,doc)=>{
        if (err) {console.log(err);}
    });



});
module.exports  = router;