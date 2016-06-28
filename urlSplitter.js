var mongoose = require('mongoose');

var splitUrl = function(url) {
	var splitUrl = url.split("?");
	var requestParameters = {};
	for(i=1;i<splitUrl.length;i++) {
		var splitParameters = splitUrl[i].split("=");
		if(splitParameters[0] == "unitPrice" || splitParameters[0] == "quantity") {
			requestParameters[splitParameters[0]] = parseFloat(splitParameters[1]);
		}
		else if(splitParameters[0] == "_id") {
			requestParameters[splitParameters[0]] = mongoose.Types.ObjectId(splitParameters[1]);
		}
		else {
			requestParameters[splitParameters[0]] = splitParameters[1];
		}
	}

	return requestParameters;
}

console.log(splitUrl('?product=yellow%20cake%20uranium?type=day'));

module.exports = splitUrl;