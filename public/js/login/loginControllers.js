'use strict';

loginModule.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'LoginService', function($scope, $rootScope, $location, LoginService) {

    toastr.info('Please, Log In!');

    $scope.login = function(){


        LoginService.login($scope.loginForm).success(function(){

            toastr.success("Authentication Successful !");

            $rootScope.isAuth = true;
            $location.path("/");
        });
    };

    $scope.createUser = function(){
        $location.path('/create');
    };

}]);

/*loginModule.controllers('LoginCtrl', function(){

});*/