/**
 * Created by ionut.aruxandei on 13/06/16.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

UserSchema.methods.validPassword = function(pwd) {
    return (this.password == pwd);
}

UserSchema.index({email: 1, type: 1}, {unique: true});

/**
 * Statics
 */
/*ProductSchema.statics.load = function(id, cb) {
 this.findOne({
 _id: id
 }).populate('user', 'name username').exec(cb);
 };*/

var UserSchema = mongoose.model('User', UserSchema);
module.exports = UserSchema;
