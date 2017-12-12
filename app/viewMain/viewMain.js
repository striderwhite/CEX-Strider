'use strict';

angular.module('striderCEX.viewMain', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Main', {
      templateUrl: 'viewMain/viewMain.html',
      controller: 'ViewMainCtrl',
      controllerAs: 'Ctrl'
    });
  }])

  .controller('ViewMainCtrl', ['$http','$interval', function ($http,$interval) {

    /* VARS */
    var vm = this;
    vm.ticker;

    /* METHODS */
    /* Setup calling UPDATE */
    var updater = $interval(function(){vm.Update();},1500);
    //Primary method for updating all values
    vm.Update = function(){

      //  GET TICKER VALUE  =
      $http({method: 'GET',url: 'https://cex.io/api/ticker/BTC/USD'}).then(function successCallback(response) {
        vm.ticker = response.data;
        /* if(response.data.last > vm.ticker.last){vm.isUp=true;} else { vm.isUp=false;} */
      }, function errorCallback(response) {console.log("ERROR" + response);});


    }



    return vm;
  }]);