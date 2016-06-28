/**
 * Created by ionut.aruxandei on 14/06/16.
 */

app.directive('login', [function(){



    return {
        restrict: "E",
        replace:true,
        templateUrl: '/views/login.html',

    };
}])
