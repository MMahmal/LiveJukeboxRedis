playlistModule.controller('playlistCtrl',['PlayerService', '$scope', function(PlayerService, $scope) {


    $scope.trackmp3 = 'js/audio/test.mp3';

    $scope.play = function(){
        PlayerService.initAudio();
    };

}]);