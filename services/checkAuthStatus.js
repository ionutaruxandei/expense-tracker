/**
 * Created by ionut.aruxandei on 14/06/16.
 */


angular.module("asd").factory('checkAuthStatus', '$http' [function() {
    if(localStorage.token != "" || localStorage.token != null) {
        $http({
            method :'post',
            path : '/auth',
            data : {token : localStorage.token}
        }).then(function successCallback(response) {
            if(response.data.tokenStatus == 'active') {

            }
            else {
                console.log("not authenticated");
                window.location = "/login";
            }
        }, function errorCallback(response) {
            console.log("not authenticated");
            window.location = "/login";
        });
    }
}] );