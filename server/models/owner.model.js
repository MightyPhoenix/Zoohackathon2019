const mongoose = require('mongoose');

var ownerInfo = mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: password
    },
    elephant_list:{
        type: Array
    }
});

mongoose.model('owner',ownerInfo);