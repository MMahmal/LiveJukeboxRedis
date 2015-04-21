loginModule.factory('LoginService', ['$http', function ($http) {
    var loginFunction = {};

    loginFunction.login = function (userData) {
        return $http.post('http://localhost:3000/rest/login', userData)
            .error(function (status) {
                if(status === 302)
                    toastr.error("Already Connected")
                toastr.error("Error Authentication");

            });


    };

    /*loginFunction.isConnected = function(userId) {
        return $http.post('http://localhost:3000/rest/connected/' + userId);
    };*/

    return loginFunction;

}]);