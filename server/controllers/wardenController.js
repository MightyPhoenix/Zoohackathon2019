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
    Owner.find((err,doc)=>{
        console.log(doc);
        res.render('Warden/addElephant',{
            title : 'New Elephant',
            list : doc
        });
    });
});

router.get('/test1',function(req,res){
    res.render('Warden/test1')
});

router.get('check-add-elephant',function(req,res){
    Warden.find((err,doc)=>{
        console.log(doc);
        res.render('Warden/checkAddElephant',{
            title : 'New Elephant',
            list : doc
        });
    });
});


//POST
router.post('/add-elephant',function(req,res){
    let owner = req.body.owner;
    let alias = req.body.alias;
    //let elephantPic = req.files.ElephantImages;
    let history = req.body.history;
    let vet = req.body.v_check;
    let warden = req.user._id;
    console.log(owner,alias,history,vet);
    res.redirect('/')

    let elephant = new Elephant({
        alias : alias,
        owner : owner,
        warden : warden,
        history : history,
        image : "/public/images/",
        v_check : vet
    });
    elephant.save((err,doc)=>{
        if (err) {console.log(err);}
        else {
            res.redirect('/dashboard');
        }
    });



});
module.exports  = router;