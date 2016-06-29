/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("spendingLimitConfirmation", ['$scope', '$http', function($scope, $http) {
    $scope.data = [];
    console.log(window.location.href);
    var getSpendingLimit = function() {
        var url = window.location.href;
        var splitUrl = url.split('?');
        $http({
            method:'get',
            url:'/spendingLimit?' + splitUrl[splitUrl.length - 1]
        }).then(function successCallback(response){
            $scope.data = response.data;
            console.log($scope.data);
        }, function errorCallback(response){
            console.log("an error occurred");
        });
    }
    getSpendingLimit();
}]);