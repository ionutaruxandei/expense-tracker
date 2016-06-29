/**
 * Created by ionut.aruxandei on 28/06/16.
 */


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/trackerdb';

var deleteExpenses = function(userId, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('products').remove({userId : userId}, null, callback);
    });


}

module.exports = deleteExpenses;