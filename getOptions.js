var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/trackerdb';

var products = [];

var findProducts = function(parameters, db, callback) {
   	var cursor = db.collection('products').find(parameters);
   	cursor.each(function(err, prod) {
      	assert.equal(err, null);
      	if (prod != null) {
        	products.push(prod);
      	} else {
         	callback();
      	}
   });
};

var returnAllOptions = function(parameters, callback) {
	products.length = 0;
	MongoClient.connect(url, function(err, db) {
		console.log('mongo client connected');
	  	assert.equal(null, err);
	  	findProducts(parameters, db, function() {
	    	db.close();
	    	callback(products);
	  	});
	  	
	});
}

module.exports = returnAllOptions;


