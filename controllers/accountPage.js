/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("accountPage", ['$scope', '$http', function($scope, $http) {
    $scope.userData = {};
    var getUserInfo = function() {
        $http({
            method:'get',
            url:'/user'
        }).then(function successCallback(response) {
            $scope.userData = response.data;
            console.log($scope.userData);
            console.log(response);
        }, function errorCallback(response) {
            // TODO ->display an error
        })
    }
    getUserInfo();
}]);
