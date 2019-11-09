require('./models/db');

const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//var hbs = exphbs.create({ /* config */ });


let app = express();

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

//Routing location
const mainController = require('./controllers/controllerMain');
const adminController = require('./controllers/adminController');
const wardenController = require('./controllers/wardenController');
const ownerController = require('./controllers/ownerController');

// SERVER
let server = http.createServer(app);

// VIEW ENGINE
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// STATIC FOLDER
app.use(express.static(path.join(__dirname, '/../public/')));

//Controller Routes

app.use('/',mainController);
app.use('/admin',adminController);
//app.use('/warden',wardenController);
//app.use('/owner',ownerContrller);


// LISTENING
let port = process.env.PORT || 3300;

server.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server is running at port : ${port}`);
})