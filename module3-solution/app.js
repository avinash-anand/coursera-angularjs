(function () {
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: './listItem.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    // ctrl.searchTerm = "";
    // ctrl.found = [];
    ctrl.narrowItDown = function () {
      ctrl.found = [];
      if(ctrl.searchTerm != "") {
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        promise.then(function (response) {
          ctrl.found = response;
          console.log(response);
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
      }
    };

    ctrl.onRemove = function (itemIndex) {
      ctrl.found.splice(itemIndex, 1);
    };

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    var found = [];

    service.getFound = function () {
      return found;
    };

    service.removeItem = function (itemIndex) {
      found.splice(itemIndex, 1);
    };

    service.getMatchedMenuItems = function(searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (response) {
        var data = response.data.menu_items;
        var foundItems = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i].description.indexOf(searchTerm) >= 0) {
            foundItems.push(data[i]);
            found.push(data[i]);
          }
        }
        return foundItems;
      });
      return response;
    };

  }

})();
