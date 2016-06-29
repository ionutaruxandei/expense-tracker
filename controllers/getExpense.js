/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("getExpense", ['$scope', '$http', function($scope, $http) {
    $scope.data = {};
    $scope.product = "";
    $scope.spendingLimitData = {};
    $scope.limitsToBeAdded = [];

    var getExpense = function() {
        var url = window.location.href;
        var splitUrl = url.split('?');
        $http({
            method:'get',
            url:'/expense?' + splitUrl[splitUrl.length - 1]
        }).then(function successCallback(response){
            $scope.data = response.data;
            $scope.data[0].date = moment($scope.data[0].date).format("YYYY-MM-DD HH:MM")
            $scope.product = response.data[0].name;
            $http({
                method:'get',
                url:'/spendingLimit?product=' + $scope.product
            }).then(function successCallback(response){
                $scope.spendingLimitData = response.data;
                $scope.limitsToBeAdded = _.difference(["day", "week", "month"],
                    $scope.spendingLimitData.map(function(sl){
                        return sl.type;
                    }))
                console.log("rec SL: ", $scope.spendingLimitData);

            }, function errorCallback(response){
            });
        }, function errorCallback(response){
        });
    };
    getExpense();

}]);
