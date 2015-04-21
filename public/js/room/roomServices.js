roomModule.factory('RoomService', ['$http', function ($http) {
    var roomFunction = {};

    roomFunction.getAll = function (idRoom) {
        return $http.get('http://localhost:3000/rest/room/' + idRoom)
            .error(function (e) {

                toastr.error("Error Getting Rooms");

            });


    };

    roomFunction.getTracks = function (idRoom) {
        return $http.get('http://localhost:3000/rest/tracks/' + idRoom)
            .error(function (e) {

                toastr.error("Error Getting Tracks");

            });


    };

    return roomFunction;

}]);