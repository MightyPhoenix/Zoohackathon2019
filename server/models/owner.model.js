const mongoose = require('mongoose');

var ownerInfo = mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    elephant_list:{
        type: Array
    },
    about:{
        type: String
    },
    accountVerified:{
        type: Boolean
    },
    emailVerified:{
        type: Boolean
    }
});

let Owner = module.exports = mongoose.model('Owner',ownerInfo);