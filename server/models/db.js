const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/zoohackathon',{useNewUrlParser : true , useUnifiedTopology: true },function(err){

        if(!err)
                console.log('MongoDB connected');
        else
                console.log('Error found : '+err);
});

require('./elephantData.model');
require('./admin.model');
require('./warden.model');
require('./owner.model');
require('./users.model');
require('./eleRequest.model');