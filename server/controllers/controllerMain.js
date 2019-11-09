// Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


//MODELS
let Admin = mongoose.model('Admin');
let Warden = mongoose.model('Warden');
let Owner = mongoose.model('Owner');
let User = mongoose.model('User');
let Elephant = mongoose.model('ElephantData');

//LOCAL STRATEGY PASSPORT

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

//LOCAL STRATEGY ENDS


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

router.post('/signUp',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var about = req.body.about;
    var password = req.body.password;
    
     
    var owner = new Owner();
    var secret = owner._id;
    var newUser = new User({
        username : email,       
        password : password,
        typeUser : "onr"
    });

    //test
    User.findOne({username:email})
    .then(user =>{
            if(user){
                    req.flash("error","Email already registered");
                    res.redirect('/dashboard');
            }
            else{                                
                User.createUser(newUser,function(err,user){
                    if(err) throw err;
    
                    owner.name = name;
                    owner.username = email;
                    owner.about = about;
                    owner.emailVerified = false;
                    owner.accountVerified = false;
                    
                    owner.save(function(err,doc) {
                            if(err) {
                                    throw err;
                            }
                            else {
                                    /*/TODO confirmation mail
                                     
                                    var transport = nodemailer.createTransport({
                                    service:'gmail',
                                    auth:{
                                            user:'atiabkalam',
                                            pass:'kahebole'
                                            }
                                    });
                                    
                                    var mailBody = `<p>Thankyou for creating your Account Mr. `+req.body.name+`.</p>`+`<p>Please verify your account by clicking this link : <a href='http://192.168.0.39:3001/owner/verify-email/`+secret+`'>click here</a></p>`;
                                    const mailOptions = {
                                            from:'atiabkalam@gmail.com',
                                            to:email,
                                            subject:'Owner Email Verification!',
                                            html:mailBody
                                    };
                                    transport.sendMail(mailOptions,(err,info)=>{
                                            if(err)
                                                    console.log(err);
                                            else
                                                    console.log(info);
                                    });
                                    //TODO email verification*/
                                    req.flash('success_msg','account created successfully');
                                    req.flash('warning_msg','Please Verify your Email!');
                                    res.redirect('/');
                            }
                    });
    
            }); 
            }
    })
    .catch(err =>(console.log(err)));
});

//POST

router.post('/login',passport.authenticate('local',
    { successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash : true }),
    function(req,res){
    res.redirect('/dashboard');
});







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
    if(req.user.typeUser == "war") {
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
