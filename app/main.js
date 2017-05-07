require('angular');
require('angular-route');
require('angular-ui-router');

require('../dist/appTemplates');

var appku = angular.module('appku', ['ngRoute', 'ui.router', 'appTemplates']);

appku.config(function($routeProvider, $stateProvider) {
  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: './templates/home.html',
      controller: 'MainController'
    })
    .state('other',{
      url: '/other',
      templateUrl: './templates/other.html',
      controller: 'OtherController'
    });
});

require('MainController');
require('OtherController');

