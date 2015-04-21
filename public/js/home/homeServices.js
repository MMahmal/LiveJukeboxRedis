homeModule.factory('HomeService', ['$http', function ($http) {
    var homeFunction = {};

    homeFunction.getAll = function () {
        return $http.get('http://localhost:3000/rest/roomsInfo')
            .error(function (e) {

                toastr.error("Error Getting Rooms");

            });

    };

    return homeFunction;

}]);