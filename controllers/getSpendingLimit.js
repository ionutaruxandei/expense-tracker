/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("getSpendingLimit", ['$scope', '$http', function($scope, $http) {
    $scope.data = [];
    var getSpendingLimit = function() {
        $http({
            method:'get',
            // url:'/spendingLimit?' + decodeURI(window.location.href.split("?")[1]) + "&" + decodeURI(window.location.href.split("?")[2])
            url:'/spendingLimit?' + decodeURI(window.location.href.split("?")[1])
        }).then(function successCallback(response){
            $scope.data = response.data;
        }, function errorCallback(response){
            console.log("an error occurred");
        });
    }
    getSpendingLimit();
    $scope.changeLimit = function() {
        var newSL = {
            product: $scope.data[0].product,
            type : $scope.data[0].type,
            limitValue: document.getElementById("newLimit").value,
            currentlySpent: $scope.data[0].currentlySpent,
            _id: $scope.data[0]._id
        };
        console.log($scope.data);
        $http({
            method:'put',
            url: '/spendingLimit',
            data: {spendingLimit : newSL}
        }).then(function successCallback(response){
            var newUrl = "/spendingLimitConfirmation?_id=" + response.data._id;
            window.location = newUrl;
        }, function errorCallback(response){

        });
    }
}]);
