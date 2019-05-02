const express =  require('express');
const router = express.Router();
const passport = require('passport');
const jwt =     require('jsonwebtoken');
const config =      require('../config/database');
const User = require('../models/user');
const Contact = require('../models/contact');
const validator = require("email-validator");
const multer = require('multer');
const Photos = require('../models/photos');
const storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname);
    }
});
const upload = multer({ storage: storage });


// Register
router.post('/register', (req, res, next) => {

    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    //Check Email Is Exists Or Not
    if(validator.validate(req.body.email)){
        User.addUser(newUser, (err, user) => {
            if(err){
                res.json({success: false, msg:'Failed to register user'});
            } else {
                res.json({success: true, msg:'User registered'});
            }
        });
    }else{
        res.json({success: false, msg:'Email Is Not Exists'});
    }

});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        name: user.firstname,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

//upload Image
router.post("/upload-photo", upload.array("uploads[]", 12), function (req, res) {

    for(let i =0; i < req.files.length; i++){

        let newPhotos = new Photos({
            originalname: req.files[i].originalname,
            mimetype: req.files[i].mimetype,
            filename: req.files[i].filename,
            path: req.files[i].path,

        });
        Photos.addPhotos(newPhotos, (err, user) => {
        });
        res.send(req.files);
    }
});

//Delete-Photo
router.post('/delete-photo', function(req, res) {
    if(req.body.id) {
        Photos.remove({_id: req.body.id})
            .then((docs)=>{
                if(docs) {
                    res.send({"success":true,data:docs});
                } else {
                    res.send({"success":false,data:"no such user exist"});
                }
            }).catch((err)=>{
            reject(err);
        })
    }else {
        res.send({"success":false,data:"please provide correct Id"});
    }


});

//Get-Photos
router.get('/getphotos', function(req, res) {
    Photos.find({}, function(err, users) {
       res.send(users);
    });
});

// contact
router.post('/addcontact',passport.authenticate('jwt', {session:false}), (req, res, next) => {

    let newContact = new Contact({
        name: req.body.name,
        number: req.body.number,
        message: req.body.message,

    });

    Contact.addContact(newContact, (err, user) => {
            if(err){
                res.json({success: false, msg:err});
            } else {
                res.json({success: true, msg:'Your Message Is Sended To Ridham Studios'});
            }
        });


});

// Profile
router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;
