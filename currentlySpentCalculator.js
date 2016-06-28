var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/trackerdb';
var moment = require('moment');
var weekDayGenerator = require('./weekDayGenerator.js');
var monthDayGenerator = require('./monthDayGenerator.js');

var monday = weekDayGenerator.getMondayAsISOString();
var sunday = weekDayGenerator.getSundayAsISOString();

var mondayAsDate = new Date(monday);
mondayAsDate.setHours(mondayAsDate.getHours()); //  - 2

var sundayAsDate = new Date(sunday);
sundayAsDate.setHours(sundayAsDate.getHours()); // .getHours() - 2

var calculateSum = function(db, requestParameters, callback) { // add productName to args
	var sum = 0;
	sum =  db.collection('products').aggregate([ { $match : { name : requestParameters.product, userId : requestParameters.userId, date : { $gte : mondayAsDate, $lt : sundayAsDate}} },
		{ $group : { _id : null, sum : {$sum: "$totalPrice"}}}])
	.toArray(function(err, result) {
		assert.equal(err, null);
		console.log("calculator result: ", result);
		callback(result);
		db.close();

   	});
}

var getSum = function(productName, callback) {
	MongoClient.connect(url, function(err, db) {
		// console.log('>>> calculator, getSum mongoConnected');
		assert.equal(null, err);
		calculateSum(db, productName, callback);
	});
}

module.exports = getSum;


