//Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Models
var Admin = mongoose.model('Admin');
var Warden = mongoose.model('Warden');
var User = mongoose.model('User');


function loggedInAdm(req,res,next){
    if(req.isAuthenticated() && req.user.typeUser=='adm'){
            return next();
    }
    else{
            res.redirect('/');
    }
}

//Routes
router.get('/register',function(req,res){
    res.render('Admin/register');
});
router.post('/register',function(req,res){

    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    console.log(`email : ${email}`);
    var admin = new Admin();
    var user = new User({
        username : email,
        password : password,
        typeUser : 'adm'
    });    

    User.createUser(user, function(err){
        if(err) throw err;

        admin.name = name;
        admin.email = email;
        admin.save(function(err,doc){
            if(err) throw err;
            res.send('Registered..');
        });
    });
});

router.get('/newWarden',loggedInAdm,function(req,res){
    res.render('Admin/newWarden');
});

router.post('/newWarden',loggedInAdm,function(req,res){

    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var state = req.body.state;
    console.log(`email : ${email}`);
    var warden = new Warden();
    var user = new User({
        username : email,
        password : password,
        typeUser : 'war'
    });    

    User.createUser(user, function(err){
        if(err) throw err;

        warden.name = name;
        warden.email = email;
        warden.state = state;
        warden.save(function(err,doc){
            if(err) throw err;
            res.send('Registered..');
        });
    });
});

module.exports = router;