const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');


let Owner = mongoose.model('Owner');
let User = mongoose.model('User');


router.post('/register',function(req,res){

        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var about = req.body.about;
        var state = req.body.state;
        console.log(`email : ${email}`);
        var owner = new Owner();
        var user = new User({
            username : email,
            password : password,
            typeUser : 'onr'
        });    
    
        User.createUser(user, function(err){
            if(err) throw err;
    
            owner.name = name;
            owner.email = email;
            owner.state = state;
            owner.about = about;
            owner.save(function(err,doc){
                if(err) throw err;
                res.send('Registered..');
            });
        });
    });
    

    router.get('/request-movement',function(req,res){
            res.render('Owner/requestMovement');
    });

module.exports = router;