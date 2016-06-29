/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("spendingLimits", ['$scope', '$http', function($scope, $http) {
    $scope.data = [];
    $scope.limitsToDisplay = [];
    console.log(window.location.href);
    var getSpendingLimit = function() {
        $http({
            method:'get',
            url:'/spendingLimit'
        }).then(function successCallback(response){
            $scope.data = response.data;
            $scope.limitsToDisplay = $scope.data.filter(function(sl){
                return sl.type == $scope.id;
            });
            console.log($scope.id);
        }, function errorCallback(response){
            console.log("an error occurred");
        });
    }
    getSpendingLimit();

    $scope.showSpendingLimitsByType = function() {
        $scope.limitsToDisplay = $scope.data.filter(function(sl){
            return sl.type == $scope.id;
        })
        console.log("limits to displayed: ", $scope.limitsToDisplay);
    }

}]);
