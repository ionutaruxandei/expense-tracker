/**
 * Created by ionut.aruxandei on 25/05/16.
 */


app.directive('header', ['$http', function($http) {
    var link = function(scope) {

        scope.goToNewExpenses = function() {
            window.location = "/";
        }

        scope.goToCheckExpenses = function() {
            window.location = "/search";
        }

        scope.goToSpendingLimits = function() {
            window.location = "/spendingLimitAdd"
        }

        scope.logout = function() {
            $http({
                method:'get',
                url:'/logout'
            }).then(function successCallback() {
                window.location = '/login';
            }, function errorCallback() {
                console.log("an error occurred");
            })
        }
        scope.goToMyAccount = function() {
            window.location = "/myAccount"
        }
    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/header.html',
        link:link
    };
}

])