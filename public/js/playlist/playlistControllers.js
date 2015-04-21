playlistModule.controller('playlistCtrl',['PlayerService', '$scope', function(PlayerService, $scope) {

    $scope.playlistContentViewPath = "templates/manager/playlist.html";
    $scope.searchViewPath = "templates/manager/search.html";
    $scope.trackmp3 = 'js/audio/test.mp3';

    $scope.play = function(){
        PlayerService.initAudio();
    };

}]);