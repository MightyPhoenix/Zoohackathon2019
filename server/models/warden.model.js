const mongoose = require('mongoose');

var wardenInfo = mongoose.Schema({
    name:{
        type: String
    },
    email:{
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