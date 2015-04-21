/**
 * Created by MhD on 17/03/15.
 */
'use strict';
var loginModule = angular.module('login.module', ['LiveJukebox']);

homeModule.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl : 'templates/login/login.html',
            controller : 'LoginCtrl'
        });
});