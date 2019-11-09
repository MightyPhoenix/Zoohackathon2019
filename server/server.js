const express = require('express');
const http = require('http');
const path = require('path');

let app = express();

let publicPath = path.join(__dirname,'/../public/');

app.use(express.static(publicPath));

let server = http.createServer(app);



let port = process.env.PORT || 3300;

server.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server is running at port : ${port}`);
})