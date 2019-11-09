const mongoose = require('mongoose');

var deact_adm = mongoose.Schema({
    name:{
        type: String
    },
    dat1:{
        type: String
    },
    data2:{
        type: Number
    }
});

mongoose.model('ElephantData',deact_adm);