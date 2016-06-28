/**
 * Created by ionut.aruxandei on 26/05/16.
 */

app.directive('spendingLimitHeader', [function() {
    var link = function(scope) {
        console.log(localStorage.limitType);
        if(localStorage.type != ""){
            scope.id = localStorage.limitType;
        }
        else {
            scope.id = "month";
        }

        scope.changeLimitTimeUnit = function(id) {
            scope.id = id;
            scope.timeUnit = id;
            if(window.location.href.indexOf("/spendingLimits") != -1) {
                scope.showSpendingLimitsByType()
            }

        }

    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/spendingLimitHeader.html',
        link:link
    };
}

])
