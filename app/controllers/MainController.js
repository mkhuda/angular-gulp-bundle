angular = require('angular');

angular.module('angulargulpbundle')
  .controller('MainController', function ($scope, $state, $routeParams, $filter) {
    console.log('Main Controller Started');
    $scope.$state = $state;
  });
