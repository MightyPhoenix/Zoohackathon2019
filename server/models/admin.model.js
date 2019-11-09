const mongoose = require('mongoose');

var adminInfo = mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    }
});

let Admin = module.exports = mongoose.model('admin',adminInfo);