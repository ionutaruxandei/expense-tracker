app.directive('spendingLimit', [function(){
	var link = function(scope, element, attr) {
		var color;
		var limit = scope.spendingLimit.limitValue;
		var spent = scope.spendingLimit.currentlySpent;
		if(spent / limit < 0.75) {
			
		}
		else if(spent / limit > 0.75 && spent / limit < 1) {
			color = "#e5e500".toString(16);
		}
		else if(spent / limit > 1) {
			color = "#a30000".toString(16);
		}
		console.log(color);
		element[0].style.backgroundColor = color;
	}
	return {
		restrict: "E",
		replace:true,
		templateUrl: '/views/spendingLimit.html',
		link:link
		};
}]);