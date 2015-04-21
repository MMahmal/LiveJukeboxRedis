'use strict';

var app = angular.module('LiveJukebox', [
  'ngRoute',
    'mgcrea.ngStrap',
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