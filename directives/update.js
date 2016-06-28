/**
 * Created by ionut.aruxandei on 22/06/16.
 */

app.directive('update', ['$http', function($http) {
    var link = function(scope) {
    scope.submitNewInfo = function() {
        $http({
            method:'put',
            url:'/user', // TODO ->add unique identifier for user when available
            data : {
                userName : document.getElementById('userName').value,
                email : document.getElementById('email').value
            }
        }).then(function successCallback(response) {
            window.location = '/myAccount/confirmation'
        }, function errorCallback() {
            // TODO ->retry or smth
        })
    }

    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/update.html',
        link:link
    };
}

])
