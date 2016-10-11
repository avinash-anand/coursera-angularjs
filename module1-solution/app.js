(function () {
  'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.message = "";
    $scope.calculateDishes = function () {
      if($scope.dishes == "") {
        $scope.message = "Please enter data first";
      } else {
        var arrayOfDishes = $scope.dishes.split(',');
        var count = arrayOfDishes.length;
        if (count > 0 && count <= 3) {
          $scope.message = "Enjoy!";
        }  else {
          $scope.message = "Too much!";
        }
      }
    };
  }
})();
