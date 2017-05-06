require('angular');
require('angular-route');
require('angular-ui-router');

var appku = angular.module('appku', ['ngRoute', 'ui.router']);

appku.run(function($rootScope, $state, $location){
  console.log("App started");
});

