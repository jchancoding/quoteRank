const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = 8000;

app.use(express.static(__dirname+'/client/dist'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//connects to mongoose & routes js files
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

//sets port to connect to
app.listen(port, function(){
    console.log("sever is running at port: "+port)
})

