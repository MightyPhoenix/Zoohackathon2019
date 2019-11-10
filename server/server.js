require('./models/db');

const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');

const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');
const expFileUpload = require('express-fileupload');
//var hbs = exphbs.create({ /* config */ });


let app = express();

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());


app.use(cookieParser('foo'));
//express Session
app.use(session({
        secret : 'secret',
        saveUninitialized : true,
        resave : true
}));

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

//passport init
app.use(passport.initialize());
app.use(passport.session());


//use flash
app.use(flash());

//global variables
app.use(function(req,res,next){
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
});


//Controller Routes

app.use('/',mainController);
app.use('/admin',adminController);
app.use('/warden',wardenController);
app.use('/owner',ownerController);


// LISTENING
let port = process.env.PORT || 3300;

server.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server is running at port : ${port}`);
})