/**
 * Created by ionut.aruxandei on 13/06/16.
 */


app.directive('userConfirmation', [function(){

    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/userConfirmation.html',
    };
}])