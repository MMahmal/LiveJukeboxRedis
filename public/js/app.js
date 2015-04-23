'use strict';

var app = angular.module('LiveJukebox', [
    'ngRoute',
    'mgcrea.ngStrap',
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