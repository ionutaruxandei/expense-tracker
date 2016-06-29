/**
 * Created by ionut.aruxandei on 29/06/16.
 */


app.controller("getOptionsSL", ['$scope', '$http', function($scope, $http) {
    $scope.data = {};
    $scope.productNames = [];
    $scope.nameSelect = [];
    $scope.isDuplicate = false;
    $scope.duplicateProduct = "";
    $scope.submitData = function() {
        if(validateInput() == true) {
            var spendingLimit = {
                product: document.getElementsByName('name')[0].value,
                type: $scope.id,
                limitValue: document.getElementById('limit').value,
                currentlySpent: 0
            };
            console.log("sl:", spendingLimit);
            $http({
                method: 'post',
                url: '/spendingLimit',
                data: {spendingLimit : spendingLimit},
            }).then(function successCallback(response){
                var newUrl = "/spendingLimitConfirmation?_id=" + response.data._id;
                window.location = newUrl;

            }, function errorCallback(response){
                console.log("resp:", response.data)
                duplicateProduct = response.data.product;
                console.log(duplicateProduct);
                alert("You have already set up a limit for this value");
                $scope.isDuplicate = true;
            });
        }
    };

    var getOptions = function() {

        $http({
            method: 'get',
            url: '/options'
        }).then(function successCallback(response){
            $scope.data = response.data;
            var selector = document.getElementsByName("name")[0];
            console.log(selector)
            console.log(decodeURI(window.location.href.split("=")[1]))

            if(window.location.href.indexOf("?") != -1) {
                $scope.productNames = [decodeURI(window.location.href.split("=")[1])];
                console.log("prod names: ", $scope.productNames);
            }
            else {
                $scope.productNames = $scope.data.map(function(prod){
                    return prod.name;
                });
            }

        }, function errorCallback(response){
            console.log("an error occurred");
        });
    };
    getOptions();
    var selectProduct = function() {
        var url = window.location.href;
        var splitUrl = url.split("=");
        $scope.productNamesOut = splitUrl[1];
    };
    selectProduct();

    $scope.changeLimit = function() {
        var selector = document.getElementsByName("name")[0];
        window.location = '/changeSpendingLimit?product=' + selector[selector.selectedIndex].value + '&type='+ $scope.id;
    };

    var validateInput = function() {
        if(document.getElementsByName("name")[0].value == "") {
            alert("Please select a product");
            return false;
        }
        else if(isNaN(parseFloat(document.getElementById("limit").value))
            || document.getElementById("limit").value == ""
            || parseFloat(document.getElementById("limit").value).toString() != document.getElementById("limit").value) {
            alert("Your limit must be a number");
            return false;
        }
        else if(document.getElementById("limit").value == "") {
            alert("please add a limit");
            return false;
        }
        else {
            return true;
        }
    }


}]);