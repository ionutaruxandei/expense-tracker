app.directive('warning', [function(){
	var link = function(scope,element,attr) {
		var limit = scope.spendingLimit.limitValue;
		var spent = scope.spendingLimit.currentlySpent;
		if(spent / limit < 0.75) {
	
		}
		else if(spent / limit > 0.75 && spent / limit < 1) {
			scope.status = "close";
		}
		else if(spent / limit > 1) {
			scope.status = "exceeded";
		}

	}
	return {
		restrict: "E",
		replace:true,
		templateUrl: '/views/warning.html',
		link:link
	};
}])