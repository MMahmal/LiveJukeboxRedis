roomModule.factory('SoundcloudService', ['$http', '$rootScope', function ($http, $rootScope) {
    var SoundcloudFunction = {};

    SoundcloudFunction.Initialize = function () {
        var CLIENT_ID = '8c2471ff11fc381b23f166e5157bc6c9';

        SC.initialize({
            client_id: CLIENT_ID
        });

    };

    /**
     * Get All Tracks from Search
     * @param track
     * @param success
     * @param error
     */
    SoundcloudFunction.getTrack = function(track, success, error){

        if(success === undefined)
            success = function(){}
        if(error === undefined)
            error = function(){}

        var promise = {};

        SC.get('/tracks', {q : track, license: 'cc-by-sa'}, function(tracks){
            //console.log(tracks);

            var tracksResult = [];

            for(var i =0;i<tracks.length;i++)
                tracksResult.push({
                    title: tracks[i].title,
                    id: tracks[i].id,
                    user:{
                        username:tracks[i].user.username
                    },
                    uri: tracks[i].uri,
                    duration: tracks[i].duration,
                    streamable: tracks[i].streamable
                })

            promise = $http.patch('http://localhost:3000/rest/tracks/'+ $rootScope.idRoomSelected + '/search', tracksResult);//promise = $http.post('http://localhost:3000/rest/tracks/'+ $rootScope.idRoomSelected + '/search', tracksResult);
            promise.success(function(data, status){
                success(data, status);
            })
                .error(function(data, status){
                    error(data, status);
                });

            return promise;
        });


    };

    /**
     * Get all users from User Search
     * @param user : user.username
     * @param success
     * @param error
     */
    SoundcloudFunction.getSoundCloudUsers = function(user, success, error) {
        if(success === undefined)
            success = function(){}
        if(error === undefined)
            error = function(){}

        var promise = {};

        //Search by User

        /** TODO
         * Search User then Track
         * **/

        //Then Search by User if searchByUser is not undefined
        SC.get('/users', {q : user, license: 'cc-by-sa'}, function(userQuery){
            //console.log(userQuery);

            var userResult = [];

            for(var i =0;i<userQuery.length;i++)
                userResult.push({
                    username: userQuery[i].username,
                    id: userQuery[i].id,
                    uri: userQuery[i].uri
                })

            console.log("Users from Search:",userResult);

            promise = $http.patch('http://localhost:3000/rest/tracks/'+ $rootScope.idRoomSelected + '/search', userResult);
            promise.success(function(data, status){
                success(data, status);
            })
                .error(function(data, status){
                    error(data, status);
                });

            return promise;
        });
    };


    /**
     *
     * @param user : Object user[{username, id}]
     * @param success
     * @param error
     */
    SoundcloudFunction.getTracksByUser = function(user, success, error) {
        if(success === undefined)
            success = function(){}
        if(error === undefined)
            error = function(){}

        var promise = {};

        /** TODO
         * Search User then Track
         * **/
        var urlGetUsersByID = '/users/' + user + '/tracks';
        //Search Tracks of User
        SC.get(urlGetUsersByID, function(userTracksList){
            //console.log(userTracksList);

            var tracksResult = [];

            for(var i =0;i<userTracksList.length;i++)
                tracksResult.push({
                    title: userTracksList[i].title,
                    id: userTracksList[i].id,
                    user:{
                        username:userTracksList[i].user.username
                    },
                    uri: userTracksList[i].uri,
                    duration: userTracksList[i].duration,
                    streamable: userTracksList[i].streamable
                })
            console.log("Users' Tracks",tracksResult);

            promise = $http.patch('http://localhost:3000/rest/tracks/'+ $rootScope.idRoomSelected + '/search', tracksResult);
            promise.success(function(data, status){
                success(data, status);
            })
                .error(function(data, status){
                    error(data, status);
                });

            return promise;
        });
    };


    /**
     * Action on Track
     * @param id
     * @param action : play or pause
     */
    SoundcloudFunction.soundTrack = function (id, action) {
        var urlTrack = '/tracks/' + id;

        SC.stream(urlTrack, function(sound){
            switch(action){
                case 'play':
                    sound.stop();
                    sound.play();
                    break;

                case 'pause':
                    sound.pause();
                    break;

                default:
                    break;
            }
        })

    };

    return SoundcloudFunction;

}]);