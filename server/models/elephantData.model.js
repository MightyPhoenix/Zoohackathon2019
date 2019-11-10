const mongoose = require('mongoose');

var deact_adm = mongoose.Schema({
    alias:{
        type: String
    },
    owner:{
        type: String
    },
    warden:{
        type: String
    },
    history:{
        type : String
    },
    image:{
        type : String
    },
    v_check:{
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type : Number
    }
});

let Elephant = module.exports = mongoose.model('ElephantData',deact_adm);