require('angular');
require('angular-route');
require('angular-ui-router');

var appku = angular.module('appku', ['ngRoute', 'ui.router']);

appku.run(function($rootScope, $state, $location){
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      console.log('stateChangeStart');
      console.log('toState', toState);
      console.log('fromState', fromState);
      // $location.url('/about');
      // console.log($state.get());
  });
});

