/**
 * Created by ionut.aruxandei on 13/06/16.
 */


app.directive('register', [function(){

    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/register.html',

    };
}])