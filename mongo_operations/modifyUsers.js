/**
 * Created by ionut.aruxandei on 24/05/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/trackerdb';
var mongoose = require('mongoose');

var modifyUser = function(data, callback) {
    var userId = mongoose.Types.ObjectId(data._id);
    delete data._id;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('sending query');
        db.collection('users').update(
            { _id : mongoose.Types.ObjectId(userId) },
            {
                email : data.email,
                userName : data.userName,
                password : data.password,
                __v : 0
            }

        );


        /*db.collection('users').update(
            {_id : data._id},
            data
        );*/
        callback();
    });

}

module.exports = modifyUser;