var roomModule  = angular.module('room.module', ['LiveJukebox']);

roomModule.config(function($routeProvider) {
    $routeProvider
        .when('/room/:idRoom', {
            templateUrl : 'templates/room/roomHome.html',
            controller : 'RoomCtrl'
        });
});