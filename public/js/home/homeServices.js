homeModule.factory('HomeService', ['$http', function ($http) {
    var homeFunction = {};

    homeFunction.getAll = function () {
        return $http.get('http://localhost:3000/rest/roomsInfo')
            .error(function (data, status) {
                if(status===400)
                    toastr.warning("No Rooms");
                else
                    toastr.error("Error Getting Rooms");

            });

    };

    homeFunction.createRoom = function (roomData) {
        return $http.post('http://localhost:3000/rest/room', roomData)
            .error(function (e) {

                toastr.error("Error Creating Room");

            });

    };

    return homeFunction;

}]);