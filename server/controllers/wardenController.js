//Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

/*router.post('/test1',(req,res)=>{
    var owner_id = req.body.owned_id;
    var v_check = req.body.v_check;
    var imageno=req.body.imageno;
    //ar[imageno];
    /*for(i=0;i<imageno;i++){
        ar[0]
    }
    let image = req.files.img;
    let imageName = Date.now()+'_'+req.files.img.name;
    var elephant = new Elephant({
        owner_id : owner_id,
        v_check : v_check
                           
        });    
        elephant.save((err , doc)=>{
            if(err){
                console.log(err);
            }          
            else{
                image.mv('public/img/questionImg/'+imageName+'', function(err) {
                        if (err){
                            console.log(err);
                            req.flash("error","File Upload Error");
                            res.redirect('/mod/domain');
                        } 
                        else{
                            req.flash('success_msg','Topic & Question created successfully');
                            res.redirect('/dashboard');
                        }
                });
            }
        });
            
    });*/

router.get('check-add-elephant',function(req,res){
    res.render('Warden/checkAddElephant');
});

router.post('/add-elephant',function(req,res){
    
})
module.exports  = router;