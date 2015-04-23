homeModule.controller('homeCtrl', ['$scope', '$rootScope', '$modal', '$route', 'HomeService', '$location',
    function($scope, $rootScope, $modal, $route, HomeService, $location) {

    if($rootScope.userConnected == undefined)
        $location.path('/login');


    $scope.formRoom = {};

    function displayRooms(){
        HomeService.getAll().success(function (data) {
            if (data != undefined && data != [{}]) {
                $scope.rooms = data;
            }
        });
    }

    displayRooms();
    $scope.join = function(AdminRoom, NameRoom){
        $rootScope.idRoomSelected = AdminRoom + ":" + NameRoom;
        $location.path('/room/' + $rootScope.idRoomSelected);
    };

    $scope.newRoom = function(){
        $scope.newModal = $modal(
            {
                scope: $scope,
                template: 'templates/room/createRoom.html',
                html: true,
                show: true
            }
        );
    };

    $scope.createRoom = function(){

        var roomData = {};
        roomData.roomName = $scope.formRoom.name;
        roomData.userAdmin = $rootScope.userConnected;

        HomeService.createRoom(roomData).success(function () {
            $scope.newModal.hide();
            $route.reload();
            toastr.success("Room Created !");
        });
    };

    $scope.cancelModal = function(){
        $scope.newModal.hide();
    }
}]);
