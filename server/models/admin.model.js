const mongoose = require('mongoose');

var adminInfo = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    }
});

let Admin = module.exports = mongoose.model('Admin',adminInfo);