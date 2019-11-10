const mongoose = require('mongoose');

var deact_adm = mongoose.Schema({
    name:{
        type: String
    },
    owner_id:{
        type: String
    },
    v_check:{
        type: String
    }
});

let Elephant = module.exports = mongoose.model('ElephantData',deact_adm);