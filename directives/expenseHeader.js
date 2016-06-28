/**
 * Created by ionut.aruxandei on 26/05/16.
 */

app.directive('expenseHeader', [function() {
    var link = function(scope) {

        scope.id = "month";

    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/expenseHeader.html',
        link:link
    };
}

])
/**
 * Created by ionut.aruxandei on 31/05/16.
 */
