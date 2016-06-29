/**
 * Created by ionut.aruxandei on 29/06/16.
 */

app.controller("getSearchResults", ['$scope', '$http', function($scope, $http) {
    var data = [];
    var counter = 0;
    $scope.productsToDisplay = [];
    $scope.timeUnit = "month";
    var getSearchResults = function() {
        var url = window.location.href;
        var urlParts = url.split("?");
        var requestParameters = "";
        for(var i = 1;i < urlParts.length;i++) {
            requestParameters = requestParameters + "?" + urlParts[i]
        }
        $http({
            method:'get',
            url:'/getSearchResults' + requestParameters
        }).then(function successCallback(response){
            data = response.data;
            data.forEach(function(product){
                product.date = moment(product.date).format("YYYY-MM-DD HH:MM");
            });
            showInitialExpenses()
        }, function errorCallback(response){
        });
    };
    getSearchResults();

    var showInitialExpenses = function() {
        console.log("initial counter:", counter);
        initalProducts = showInitial(data, $scope.timeUnit);
        initialStartDate = getStartAndEndDate(counter, $scope.timeUnit)[0];
        initialEndDate = getStartAndEndDate(counter, $scope.timeUnit)[1];

        $scope.productsToDisplay.push({
            products:initalProducts,
            startDate:initialStartDate,
            endDate:initialEndDate
        });
    }

    $scope.showPreviousExpenses = function() {
        counter++;
        var previousExpenses = showPrevious(data, $scope.timeUnit, counter);
        $scope.productsToDisplay.push({
            products : previousExpenses,
            startDate : getStartAndEndDate(counter, $scope.timeUnit)[0],
            endDate : getStartAndEndDate(counter, $scope.timeUnit)[1]
        });
    }

    $scope.changeLimitTimeUnit = function(id) {
        $scope.id = id;
        $scope.timeUnit = id;
        counter = 0;
        $scope.productsToDisplay = [];
        showInitialExpenses();
    }

}]);
