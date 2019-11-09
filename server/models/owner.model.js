const mongoose = require('mongoose');

var ownerInfo = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    elephant_list:{
        type: Array
    },
    about:{
        type: String
    },
    state : {
        type : String
    },
    accountVerified:{
        type: Boolean,
        default : false     
    },
    emailVerified:{
        type: Boolean
    }
});

let Owner = module.exports = mongoose.model('Owner',ownerInfo);