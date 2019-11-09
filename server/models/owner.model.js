const mongoose = require('mongoose');

var ownerInfo = mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    elephant_list:{
        type: Array
    }
});

let Owner = module.exports = mongoose.model('owner',ownerInfo);