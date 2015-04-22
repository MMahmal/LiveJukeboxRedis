'use strict';

var app = angular.module('LiveJukebox', [
    'ngRoute',
    'mgcrea.ngStrap',
    'plangular',
    'playlist.module',
    'login.module',
    'home.module',
    'user.module',
    'room.module'
]);

app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
          .otherwise({
              redirectTo: '/'
          });
}]);

app.config(function(plangularConfigProvider){
    plangularConfigProvider.clientId = '8c2471ff11fc381b23f166e5157bc6c9';
});