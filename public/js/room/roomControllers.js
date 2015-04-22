roomModule.controller('RoomCtrl', ['$scope', 'RoomService', 'SoundcloudService', '$rootScope', '$location',
    function($scope, RoomService, SoundloudService, $rootScope, $location) {

    $scope.roomData = [];

    if($rootScope.isAuth==false){
     $scope.mainContentView = "login";
     $scope.mainContentViewPath = "templates/login/login.html"
     }
     else{
     $scope.mainContentView = "home";
     $scope.mainContentViewPath ="templates/home/welcome.html";

     toastr.info('Coucou les Loulous !');
     }


    function displayRoomData(){

        console.log($rootScope.idRoomSelected);

        var room = {};
        room.name = $rootScope.idRoomSelected;

        if($rootScope.idRoomSelected == undefined)
            $location.path('/');
        else
            RoomService.getAll(room.name).success(function (data) {
                if (data != undefined) {
                    $scope.roomData = data;
                }
            });
            RoomService.getTracks(room.name).success(function(data){
                if(data != undefined){
                    $scope.roomTracks = data
                    console.log($scope.roomTracks);

                }
            });
    }
    displayRoomData();

    $scope.closeRoom = function(){
        RoomService.delete($rootScope.idRoomSelected).success(function () {
            toastr.warning("Room :" +  $scope.roomData.roomName +  " has been deleted");
            $location.path('/');
        });
    };

    $scope.leaveRoom = function(){
        $location.path('/');
    };

    SoundloudService.Initialize();

    $scope.trackSearchResults = [];

    $scope.getTrackSearch = function(trackSearch){

        SoundloudService.getTrack(trackSearch, function(data, status){
            $scope.trackSearchResults = data;

            console.log($scope.trackSearchResults);
        });

    }
}]);