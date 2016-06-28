app.directive('addLimitOption', [function(){
	var link = function(scope,element,attr) {
		var len = scope.spendingLimitData.length;
		console.log("SL length: ", scope.limitsToBeAdded.length)
		if(scope.limitsToBeAdded.length == 0) {
			scope.limitStatus = "none";
			console.log("limit status: ",scope.limitStatus)
		}
		else {

		}
		scope.addLimit = function(type) {
			var productName = document.getElementsByClassName('name')[0].value;
			localStorage.limitType = type;
			window.location = "/spendingLimitAdd?product=" + scope.product;
		}
	}
	return {
		restrict: "E",
		replace:true,
		templateUrl: '/views/addLimitOption.html',
		link:link
	};
}])