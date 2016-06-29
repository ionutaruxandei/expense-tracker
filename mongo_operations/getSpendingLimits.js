	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://localhost/trackerdb';
	var getCurrentlySpent = require('./currentlySpentCalculator');
	var async = require('async');
	var csl = [];

	var findSpendingLimits = function(db, parameters, callback) {
		
	   	var cursor = db.collection('spendinglimits').find(parameters);
	   	csl.length = 0;
	   	cursor.stream()
	   		.on('data', function(spendingLimit){
	   			console.log('csl: ', csl);
	   			csl.push(spendingLimit);
	   		})
	   		.on('error', function(err){
	   			console.log(err);
	   		})
	   		.on('end', function(){
	   			//console.log('done');
	   			var len = csl.length;
	   			var c = 0;
	   			var results = [];
	   			// console.log("csl:", csl);
	   			async.map(
	   				csl, 
	   				function(sl, doneCB){
						var calculationParameters = {};
						calculationParameters.product = sl.product;
						calculationParameters.userId = parameters.userId;
						console.log('calc parameters in getSL: ', calculationParameters);
	   					getCurrentlySpent(calculationParameters, function(spent){
	   						if(spent.length > 0) {
	   							sl.currentlySpent = spent[0].sum;
	   							results.push(sl);
	   							console.log("sl: ", sl);
	   							
	   						}
	   						else {
	   							sl.currentlySpent = 0;
	   							results.push(sl);
	   						}
	   						doneCB(null,sl);
	    				});
	   					
	   				},
	   				function(err, results){
      					callback(results);
    				})	
	   		})
	};
	var getSpendingLimits = function(parameters, callback) {
		console.log('<<>> getSpendingLimits launched')
		MongoClient.connect(url, function(err, db) {
			// console.log('** mongo client connected');
		  	assert.equal(null, err);
		  	findSpendingLimits(db, parameters, function(csl) {
		    	// db.close();
				console.log(">>>>>>>>>>>>>>>csl: ", csl);
		    	callback(csl);
		  	});
		  	
		});
	};

	module.exports = getSpendingLimits;


/*var findSpendingLimits = function(db, parameters, callback) {
		console.log('<<>> findSpendingLimits launched')
	   	var cursor = db.collection('spendinglimits').find(parameters);
	   	var csl = [];
	   	cursor.stream()
	   		.on('data', function(spendingLimit){
	   			csl.push(spendingLimit);
	   			console.log("aaaa");
	   		})
	   		.on('error', function(err){
	   			console.log(err);
	   		})
	   		.on('end', function(){
	   			console.log('done');

	   			var len = csl.length;
	   			var c = 0;

	   			var results = [];

	csl.forEach(function(sl){
	   		getCurrentlySpent(sl.product, function(spent){
	   			if(spent.length > 0) {
	   				sl.currentlySpent = spent[0].sum;
	   				results.push(sl);
	   				console.log(">>>sl:",sl);
					c++;
	      			if (c === len) {
	        			cb(results);
	      			}
	   			}
	   			else {
	   				sl.currentlySpent = 0;
	   				results.push(sl);
	   				console.log(">>>sl:",sl);
					c++;
	      			if (c === len) {
	        			callback(results);
	      			}
	   			}
	    });
	  });
	   		})
	};*/





/*
var findSpendingLimits = function(db, parameters, callback) {
		console.log('<<>> findSpendingLimits launched')
	   	var cursor = db.collection('spendinglimits').find(parameters);
	   	var csl = [];
	   	cursor.stream()
	   		.on('data', function(spendingLimit){
	   			csl.push(spendingLimit);
	   		})
	   		.on('error', function(err){
	   			console.log(err);
	   		})
	   		.on('end', function(){
	   			console.log('done');

	   			callback(csl);
	   			
	   		})
	};
*/










