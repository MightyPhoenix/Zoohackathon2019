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

let Elephant = module.exports = mongoose.model('ElephantData',deact_adm);