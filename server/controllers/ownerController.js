const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');


let Owner = mongoose.model('Owner');
let User = mongoose.model('User');



router.get('/verify-email/:id',function(req,res){
    var id = req.params.id;
    Owner.findOneAndUpdate({ 
           _id  : id,
           emailVerified : false 
    },{
            emailVerified : true
    },
    function(err,doc){
            if(!err){
                    req.flash('success_msg','Email verified!');
                    res.render('emailVerified');
            }else {
                    throw err;
                    console.log('err' + err);
                    res.redirect('/');
            }
    });
});


module.exports = router;