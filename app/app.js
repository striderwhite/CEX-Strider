'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('striderCEX', [
  'ngRoute',
  'striderCEX.viewMain',
  'striderCEX.viewAuthenticate',
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/Main', {
    templateUrl: 'viewMain/viewMain.html',
    controller: 'ViewMainCtrl',
    controllerAs: 'Ctrl'
  }).when('/Authenticate', {
    templateUrl: 'viewAuthenticate/viewAuthenticate.html',
    controller: 'ViewAuthenticateCtrl',
    controllerAs: 'Ctrl'
  }).otherwise({
    redirectTo: '/Main'
  });

}]);