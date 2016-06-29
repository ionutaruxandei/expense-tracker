/**
 * Created by ionut.aruxandei on 24/05/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/trackerdb';

var modifySpendingLimit = function(data, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        db.collection('spendinglimits').update(
            {product : data.product, type: data.type, userId: data.userId},
            {$set: {
                limitValue : data.limitValue
            }}
        );
        callback();
    });

}

module.exports = modifySpendingLimit;