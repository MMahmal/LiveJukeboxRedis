playlistModule.service('PlayerService', function () {
    var playerFunction = {};

    playerFunction.initAudio = function (){

        var audio5js = new Audio5js({
            swf_path: 'js/audio5js/audio5js.swf',
            throw_errors: true,
            format_time: true,
            ready: function (player) {
                //this -> instance d'audio5js
                //Chargement du fichier mp3
                //this.load($track);
                this.load('audio/test.mp3');
                this.play();
                //will output {engine:'html', codec: 'mp3'} in browsers that support MP3 playback.
                // will output {engine:'flash', codec: 'mp3'} otherwise
                //console.log(player);
            }
        });

    }

    return playerFunction;

});