/**
 * Created by ionut.aruxandei on 23/06/16.
 */

app.directive('closeAccount', ['$http', function($http) {
    var link = function(scope) {

        scope.closeAccount = function() {
            $http({
                method : 'delete',
                url : '/users'
            }).then(function successCallback() {
                window.location = '/accountClosed'
            }, function errorCallback() {
                // TODO -> do something
            })
        }

    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/closeAccount.html',
        link:link
    };
}

])

