const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Contact Schema
const ContactSchema  = mongoose.Schema({
    name :    { type: String },
    number :    { type: String },
    message:    { type: String},
});

const Contact = module.exports = mongoose.model('contact',ContactSchema);

module.exports.addContact = function(newContact,callback){
    newContact.save(callback);
}

