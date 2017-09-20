require('angular');
require('angular-route');
require('angular-ui-router');
require('../dist/appTemplates');

const appku = angular.module('angulargulpbundler', ['ngRoute', 'ui.router', 'appTemplates']);

appku.config(function($routeProvider, $stateProvider, $locationProvider) {
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
  $locationProvider.html5Mode(true);
});

require('MainController');
require('OtherController');

