roomModule.factory('RoomService', ['$http', function ($http) {
    var roomFunction = {};

    roomFunction.getAll = function (idRoom) {
        return $http.get('http://localhost:3000/rest/room/' + idRoom)
            .error(function (e) {

                toastr.error("Error Getting Rooms");

            });


    };

    roomFunction.delete = function (idRoom) {
        return $http.delete('http://localhost:3000/rest/room/' + idRoom)
            .error(function (e) {
                toastr.error("Error Deleting Room" + idRoom);
            });


    };

    roomFunction.getTracks = function (idRoom) {
        return $http.get('http://localhost:3000/rest/tracks/' + idRoom)
            .error(function (e) {

                toastr.error("Error Getting Tracks");

            });


    };

    roomFunction.setPlaylist = function(trackData, idRoom) {
        return $http.post('http://localhost:3000/rest/playlist/' + idRoom, trackData)
    }

    roomFunction.getPlaylist = function(idRoom){
        return $http.get('http://localhost:3000/rest/playlist/' + idRoom)
            .error(function(e){
                toastr.error("Error Getting Playlist");
        })
    }


    return roomFunction;

}]);