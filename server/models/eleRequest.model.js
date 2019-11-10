const mongoose = require('mongoose');

var eleInfo = mongoose.Schema({
    user : {
        type : String
    },
    data : {
        type : String
    },
    state : {
        type : String
    },
    verified : {
        type : Boolean,
        default : false
    }
});

let Owner = module.exports = mongoose.model('ElephantCreateRequest',eleInfo);