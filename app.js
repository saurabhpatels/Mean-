const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const upload = require('express-fileupload');

//Connect To Databse
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected',() => {
    console.log('Connected To '+ config.database);
});

//On Error
mongoose.connection.on('error',(err) => {
    console.log('Error:  '+ err);
});


const app = express();
const users = require('./routes/users');

//Port Number
const port = 3000;

//Inject Services
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use(express.static(path.join(__dirname,'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users',users);

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
//Listen To The Port
app.listen(port,()=>{
    console.log('server Is Running On Port Number:' + port);
});

