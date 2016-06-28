/**
 * Created by ionut.aruxandei on 28/06/16.
 */


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/trackerdb';

var deleteSpendingLimits = function(userId) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('spendinglimits').remove({userId : userId});
    });



}

module.exports = deleteSpendingLimits;