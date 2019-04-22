const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Register
router.get('/Register',(req,res,next) => {
    let newUser = new User({
        name:  req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });


   res.send('Register');
});

//Profile
router.get('/Profile',(req,res,next) => {
    res.send('Profile');
});

//Validate
router.get('/Validate',(req,res,next) => {
    res.send('Validate');
});

//Authenticate
router.get('/Authenticate',(req,res,next) => {
    res.send('Authenticate');
});

module.exports = router;
