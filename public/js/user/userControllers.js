userModule.controller('CreateUserCtrl', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {

    $scope.formUser = {};

    if($scope.password != $scope.confirmpassword){
        toastr.error('Wrong Password');
        $location.path('/create');
        $scope.password = '';
        $scope.confirmpassword = '';
    }



    $scope.create = function(){

        UserService.create($scope.formUser).success(function(){

            toastr.success("Inscription réussie !", "Félicitations !");

            $location.path("/login");
        });
    }

}]);
