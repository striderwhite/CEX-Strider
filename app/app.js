'use strict';

// Declare app level module which depends on views, and components
angular.module('striderCEX', [
  'ngRoute',
  'striderCEX.viewMain'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/Main'});

}]);
