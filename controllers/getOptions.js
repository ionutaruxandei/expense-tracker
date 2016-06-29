/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("getOptions", ['$scope', '$http', function($scope, $http) {
    $scope.data = {};
    $scope.nameSelect = [];
    $scope.categorySelect = [];
    $scope.unitPriceSelect = [];

    var getOptions = function() {
        $http({
            method: 'get',
            url: '/options'
        }).then(function successCallback(response){
            // $scope.data = response.data;
            $scope.data.productNames = response.data.map(function(prod){
                return prod.name;
            });
            $scope.data.categoryNames = response.data.map(function(prod){
                return prod.category;
            });
            console.log("categories: ", $scope.data.categoryNames);
            $scope.data.unitPrice = response.data.map(function(prod){
                return prod.unitPrice;
            })
        }, function errorCallback(response){
            console.log("an error occurred");
        });
    };
    getOptions();
}]);