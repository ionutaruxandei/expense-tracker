/**
 * Created by ionut.aruxandei on 23/06/16.
 */

app.directive('changePassword', ['$http', function($http) {
    var link = function(scope) {
        scope.passwordMatch = true;
        scope.submitNewPassword = function() {
            if(document.getElementById('newPassword').value == document.getElementById('confirmNewPassword').value) {
                $http({
                    method:'put',
                    url:'/user',
                    data : {
                        currentPassword : document.getElementById('currentPassword').value,
                        password : document.getElementById('newPassword').value
                    }
                }).then(function successCallback(response) {
                    window.location = '/myAccount/confirmation'
                }, function errorCallback() {
                    // TODO ->retry or smth
                })
            }
            else {
                scope.passwordMatch = false;
            }

        }

    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/changePassword.html',
        link:link
    };
}

])

