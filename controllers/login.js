/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("login", ['$scope', '$http', function($scope, $http) {
    $scope.submit = function() {
        console.log("trying to submit")
        $http({
            method: 'post',
            url:'/login',
            data : {
                username : document.getElementById("user").value,
                password : document.getElementById("password").value
            }
        }).then(function successCallback(response){

        }, function errorCallback(response){

        });
    }

    $scope.goToRegisterPage = function() {
        console.log("trying to go to register");
        window.location.href = "/register";
    }
}]);
