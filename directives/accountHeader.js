/**
 * Created by ionut.aruxandei on 22/06/16.
 */

app.directive('accountHeader', [function() {
    var link = function(scope) {

        scope.accountPageId = "update";

        scope.changePage = function(id) {
            scope.accountPageId = id;
            console.log(scope.accountPageId);
        }

    }



    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/accountHeader.html',
        link:link
    };
}

])
/**
 * Created by ionut.aruxandei on 31/05/16.
 */
