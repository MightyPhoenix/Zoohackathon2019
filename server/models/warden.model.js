const mongoose = require('mongoose');

var wardenInfo = mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: password
    },
    state:{
        type: String
    },
    owner_list:{
        type: Array
    }
});

mongoose.model('warden',wardenInfo);warden