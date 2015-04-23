var userModule  = angular.module('user.module', ['LiveJukebox']);

userModule.config(function($routeProvider) {
    $routeProvider
        .when('/create', {
            templateUrl : 'templates/user/createUser.html',
            controller : 'CreateUserCtrl'
        });

});