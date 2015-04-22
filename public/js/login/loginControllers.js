'use strict';

loginModule.controller('LoginCtrl', ['$scope', '$rootScope', '$route', '$location', 'LoginService',
    function($scope, $rootScope, $route, $location, LoginService) {

    toastr.info('Please, Log In!');



    $scope.login = function(userConnected){

        if($scope.loginForm.user == undefined || $scope.loginForm.password == undefined)
            $route.reload();
        else
            LoginService.login($scope.loginForm).success(function(){

                toastr.success("Authentication Successful !");

                $rootScope.userConnected = userConnected;
                $location.path("/");
            });
    };

    $scope.createUser = function(){
        $location.path('/create');
    };

}]);

/*loginModule.controllers('LoginCtrl', function(){

});*/