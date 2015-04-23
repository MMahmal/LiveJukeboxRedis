var homeModule  = angular.module('home.module', ['LiveJukebox']);

homeModule.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'templates/home/home.html',
            controller : 'homeCtrl'
        });

});