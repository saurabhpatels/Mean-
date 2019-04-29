const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Contact Schema
const PhotosSchema  = mongoose.Schema({
    originalname :    { type: String },
    mimetype :    { type: String },
    filename:    { type: String},
    path:{ type: String},
});

const Photos = module.exports = mongoose.model('photos',PhotosSchema);

module.exports.addPhotos = function(newPhotos,callback){
    newPhotos.save(callback);
}

