// Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');


//MODELS
let Admin = mongoose.model('Admin');
let Warden = mongoose.model('Warden');
let Owner = mongoose.model('Owner');
let User = mongoose.model('User');
let Elephant = mongoose.model('ElephantData');


// GET
router.get('/',(req, res, next)=>{
    res.render('index', { title: 'Index' });
});

router.get('/login',(req, res, next)=>{
    res.render('login', { title: 'login' });
});

router.get('/signup',(req, res, next)=>{
    res.render('Owner/signUp', { title: 'Registration' });
});

//POST



//localstrategy passport

passport.use(new localStrategy(function(username,password,done){
       
    User.getUserByUsername(username,function(err,user){
            if(err) throw err;
            if(!user){
                    return done(null,false,{message : 'Unknown User'});

            }

            User.comparedPassword(password,user.password,function(err,isMatch){
                    if(err) throw err;
                    if(isMatch){
                            
                            
                            return done(null,user);
                            
                    }
                    else{
                            return done(null,false,{message : 'Invalid passpword'})
                    }
            });
    });
}));
    passport.serializeUser(function(user, done) {

            console.log('userId: '+user._id);
            done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
            User.getUserById(id, function(err, user) {
            done(err, user);
            });
    });

router.post('/login',passport.authenticate('local',
    { successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash : true }),
    function(req,res){
    res.redirect('/dashboard');
});


//localstrategy ends




function loggedIn(req,res,next){
    if(req.isAuthenticated()){
            return next();
    }
    else{
            res.redirect('/');
    }
}
function loggedOut(req,res,next){
    if(!req.isAuthenticated()){
            return next();
    }
    else{
            res.redirect('/dashboard');
    }
}

// dashboard


router.get('/dashboard',loggedIn,function(req,res){
    var userType= "";
    if(req.user.typeUser == "adm") {
            userType = "Admin";
            var resume = "";
           // const adminDetails;
            var name = req.user.username;
            // var admin = new Admin();
            Admin.findOne({email : name},function(err,doc){
                    if(!err){
                            const adminDetails = doc;
                            res.render('Admin/dashboard',{
                                userType : userType,
                                name : name,
                             
                                });
                            
                    }
                    else {
                            console.log(err);
                    }
            });
            
          
    }
    else 
    if(req.user.typeUser == "wdn") {
        userType = "Warden";
       
       // const adminDetails;
        var name = req.user.username;
        // var admin = new Admin();
        Warden.findOne({email : name},function(err,doc){
                if(!err){
                        const adminDetails = doc;
                        res.render('Warden/dashboard',{
                            userType : userType,
                            name : name,
                
                            });
                        
                }
                else {
                        console.log(err);
                }
        });
        
      
        }
        else
        if(req.user.userType = "onr"){
            if (err) throw err;

            var name = req.user.username;

            Owner.findOne({email : name},function(err,doc){
                if (err) throw err;
                res.render('Owner/dashboard',{
                    userType : userType,
                    doc : doc
                });
            })
        }

});


module.exports = router;
