require('./models/db');

const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let app = express();


//ROUTES
const mainController = require('./controllers/controllerMain');


// SERVER
let server = http.createServer(app);

// VIEW ENGINE
app.set('views', path.join(__dirname, '/../public/views/'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// STATIC FOLDER
app.use(express.static(path.join(__dirname, '/../public/')));




//Controller Routes

app.use('/',mainController);


let port = process.env.PORT || 3300;

server.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server is running at port : ${port}`);
})