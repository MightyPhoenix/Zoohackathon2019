// Modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

//MODELS


// GET
router.get('/',(req, res, next)=>{
    res.render('index', { title: 'Index' });
});

router.get('/login',(req, res, next)=>{
    res.render('login', { title: 'login' });
});

router.get('/signup',(req, res, next)=>{
    res.render('signup', { title: 'Registration' });
});


module.exports = router;
