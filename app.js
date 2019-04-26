const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

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
const port = 5000;

//Inject Services
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyparser.json());
app.use('/users',users);
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Listen To The Port
app.listen(port,()=>{
    console.log('server Is Running On Port Number:' + port);
});

