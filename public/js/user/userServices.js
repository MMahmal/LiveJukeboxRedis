userModule.factory('UserService', ['$http', function ($http) {
    var userFunction = {};

    userFunction.create = function (userData) {
        return $http.post('http://localhost:3000/rest/user', userData)
            .error(function (e) {

                    toastr.error("Error Creating User");

            });


    };

    return userFunction;

}]);