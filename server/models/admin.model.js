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

mongoose.model('admin',adminInfo);