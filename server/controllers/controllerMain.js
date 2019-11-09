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

router.get('/test',function(req,res){
    res.send('test');
});


module.exports = router;
