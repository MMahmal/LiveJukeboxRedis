homeModule.controller('homeCtrl', ['$scope', '$rootScope', 'HomeService', '$location',
    function($scope, $rootScope, HomeService, $location) {



    /*if($rootScope.isAuth==false){
        $scope.mainContentView = "login";
        $scope.mainContentViewPath = "templates/login/login.html"
    }
    else{
        $scope.mainContentView = "home";
        $scope.mainContentViewPath ="templates/home/welcome.html";

        toastr.info('Coucou les Loulous !');
    } */


    /*$scope.message = 'WELCOME';
    $scope.id = '91809' */

    function displayRooms(){
        HomeService.getAll().success(function (data) {
            if (data != undefined) {
                $scope.rooms = data;
            }
        });
    }

    displayRooms();

    $scope.join = function(idRoom){
        $rootScope.idRoomSelected = idRoom;
        $location.path('/room/' + idRoom);
    };
}]);
