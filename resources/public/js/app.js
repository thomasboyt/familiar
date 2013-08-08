angular.module('familiar', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {templateUrl: 'templates/data-entry.html', controller: "DataEntryCtrl"});
      //when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      //when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      //otherwise({redirectTo: '/phones'});
  }])

  .controller("DataEntryCtrl", ['$scope', '$http', function($scope, $http) {
    $http.get("/api/variables").then(function(response) {
      $scope.data = response.data;
    });

    $scope.saveBack = function() {
      console.log($scope.data);
      $http.post("/api/data", $scope.data).then(function(response) {
        // it worked!
      });
    };
  }]);
