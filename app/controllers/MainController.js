angular = require('angular');

angular.module('appku')
  .controller('MainController', function ($scope, $state, $routeParams, $filter) {
    console.log('Main Controller Started');
    $scope.$state = $state;
  });
