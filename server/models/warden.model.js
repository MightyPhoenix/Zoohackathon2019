const mongoose = require('mongoose');

var wardenInfo = mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    state:{
        type: String
    },
    owner_list:{
        type: Array
    }
});

let Warden = module.exports = mongoose.model('Warden',wardenInfo);