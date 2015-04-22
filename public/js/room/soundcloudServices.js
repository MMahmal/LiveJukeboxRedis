roomModule.factory('SoundcloudService', ['$http', '$rootScope', function ($http, $rootScope) {
    var SoundcloudFunction = {};

    SoundcloudFunction.Initialize = function () {
        var CLIENT_ID = '8c2471ff11fc381b23f166e5157bc6c9';

        SC.initialize({
            client_id: CLIENT_ID
        });

    };

    SoundcloudFunction.getTrack = function(track, success, error){

        if(success === undefined)
            success = function(){}
        if(error === undefined)
            error = function(){}

        var promise = {};

        SC.get('/tracks', {q : track, license: 'cc-by-sa'}, function(tracks){
            console.log(tracks);
            console.log(tracks[0].title);

            var tracksResult = [];

            for(var i =0;i<tracks.length;i++)
                tracksResult.push({
                    title: tracks[i].title,
                    id: tracks[i].id,
                    user:{
                        username:tracks[i].user.username
                    },
                    uri: tracks[i].uri
                })
            promise = $http.patch('http://localhost:3000/rest/tracks/'+ $rootScope.idRoomSelected + '/search', tracksResult);
            //promise = $http.post('http://localhost:3000/rest/tracks/'+ $rootScope.idRoomSelected + '/search', tracksResult);
            promise.success(function(data, status){
                success(data, status);
            })
                .error(function(data, status){
                    error(data, status);
                });

            return promise;
        });


    };

    return SoundcloudFunction;

}]);