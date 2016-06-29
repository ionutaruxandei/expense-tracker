/**
 * Created by ionut.aruxandei on 22/06/16.
 */

app.directive('update', ['$http', function($http) {
    var link = function(scope) {
        scope.validationStatus = '';
        scope.submitNewInfo = function() {
            if(validateData()) {
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

        var validateData = function() {
            var email = document.getElementById('email').value;
            var userName = document.getElementById('userName').value;
            if(email.indexOf('@') === -1 || email.substr(email.length - 4) != '.com') {
                scope.validationStatus = "incorrectEmail";
                return false;
            }
            else if(userName === '') {
                scope.validationStatus = "noUserName";
                return false;
            }
            else {
                $scope.validationStatus = "";
                return true;
            }
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
