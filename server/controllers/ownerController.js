// Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

//MODELS
let Owner = mongoose.model('Owner');
let User = mongoose.model('User');
let ElephantCreateRequest = mongoose.model('ElephantCreateRequest');


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

    router.get('/request-add-elephant',function(req,res){
        res.render('Owner/addElephantRequest');
    });

    router.post('/request-add-elephant',function(req,res){
        var data = req.body.data;
        var userEmail = req.user.username;
        Owner.findOne({email : userEmail},function(err,doc){
            if(err) throw err;
            var state = doc.state;
            var newElephant = new ElephantCreateRequest();
            newElephant.data = data;
            newElephant.user = userEmail;
            newElephant.state = state;
            newElephant.save(function(err,doc){
                if(err) throw err;
                res.redirect('/');
            });
        });

    });

module.exports = router;