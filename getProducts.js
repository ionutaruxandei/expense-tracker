var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/trackerdb';

var products = [];

var findProducts = function(db, parameters, callback) {
	console.log("parameters for findProducts: " , parameters)
   	var cursor = db.collection('products').find(parameters);
   	cursor.each(function(err, prod) {
      	assert.equal(err, null);
      	if (prod != null) {
      		// console.log(prod);
        	products.push(prod);
      	} else {
         	callback();
      	}
   });
};

var returnAllProducts = function(parameters, callback) {
	products.length = 0;
	MongoClient.connect(url, function(err, db) {
	  	assert.equal(null, err);
	  	findProducts(db, parameters, function() {
	    	db.close();
	    	callback(products);
	  	});
	  	
	});
}

module.exports = returnAllProducts;