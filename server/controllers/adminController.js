//Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Models
var Admin = mongoose.model('Admin');
var User = mongoose.model('User');


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


module.exports = router;