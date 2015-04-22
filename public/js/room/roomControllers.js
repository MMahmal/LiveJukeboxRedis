roomModule.controller('RoomCtrl', ['$scope', 'RoomService', 'SoundcloudService', '$rootScope', '$modal', '$location',
    function($scope, RoomService, SoundcloudService, $rootScope, $modal, $location) {

    $scope.roomData = [];

    //Initialize connection to SoundCloud API
    SoundcloudService.Initialize();

    if($rootScope.isAuth==false){
         $scope.mainContentView = "login";
         $scope.mainContentViewPath = "templates/login/login.html"
     }
     else{
         $scope.mainContentView = "home";
         $scope.mainContentViewPath ="templates/home/welcome.html";
     }

    //Display all the Room Available
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

    //Display Room
    displayRoomData();

    /** TODO *
     * Delete Room from Rooms List
     * */
    $scope.closeRoom = function(){
        RoomService.delete($rootScope.idRoomSelected).success(function () {
            toastr.warning("Room :" +  $scope.roomData.roomName +  " has been deleted");
            $location.path('/');
        });
    };

    //Close Room:idRoomSelected and back to Rooms List
    $scope.leaveRoom = function(){
        $location.path('/');
    };



    $scope.SearchResults = [];

    /**
     * Function Search by Track or by User or by Track and User
     * @param trackNameSearch
     * @param userNameSearch
     */
    $scope.getTrackSearch = function(trackNameSearch, userNameSearch){

        $scope.trackSearchResults = {};
        $scope.userSearchResults = {};

        console.log("UserName Search: ", userNameSearch);
        console.log("TrackName Search: ", trackNameSearch);

        if(userNameSearch == undefined)
            SoundcloudService.getTrack(trackNameSearch, function(data, status){
                $scope.SearchResults = data;
                console.log($scope.SearchResults);
            });

        if(trackNameSearch == undefined)
            SoundcloudService.getSoundCloudUsers(userNameSearch, function(data, status){
                $scope.SearchResults = data;
                console.log($scope.SearchResults);
            });
        if(userNameSearch != undefined && trackNameSearch != undefined)


            console.log("ALL ENTER");

        //Reset Search params
        $scope.searchTrackName=undefined;
        $scope.searchUserName=undefined;
    }


    $scope.userSelected = {};

    /** TODO
     * Search from User Profile id in /users/:id
     * Get ALL /users/:id/tracks and choose in modal
     * **/
    $scope.trackByUser = function(user){
        console.log(user);
        $scope.userSelected.username = user.username;
        $scope.userSelected.id = user.id;

        $scope.SearchModalResults = {};

        SoundcloudService.getTracksByUser(user.id, function(data, status){
            $scope.SearchModalResults = data;
            console.log($scope.SearchModalResults);
        });

        $scope.modalTrackByUser = $modal(
            {
                scope: $scope,
                template: 'templates/room/userTracks.html',
                html: true,
                show: true
            }
        );
    }

    $scope.closeModal = function(){
        $scope.modalTrackByUser.hide();
        $scope.userSelected.username = undefined;
        $scope.userSelected.id = undefined;
    }


    $scope.playTrack = function(idTrack, action){
        SoundcloudService.soundTrack(idTrack, action);
    }

    /**
     * Select Track In Modal and post in idPlaylist:idRoomSelected
     */
    $scope.selectTrackModal = function(idTrack){

        RoomService.setPlaylist();

    }
}]);
