'use strict';

angular.module('striderCEX.viewMain', ['ngRoute'])
  .controller('ViewMainCtrl', ['$http', '$interval', 'cexService', function ($http, $interval,cexService) {

    /* VARS */
    var vm = this;
    vm.updater;
    vm.ticker;
    vm.numberOfCoins = 1;
    vm.profit;


    cexService.GetBalance().then(function(data){
      vm.balance = data;
    });


    /* METHODS */
    /* Setup calling UPDATE */
    if (!angular.isDefined(vm.updater)){
      vm.updater = $interval(function () {
        vm.Update();
        vm.GetProfit();
      }, 1500);
    }




    //Primary method for updating all values
    vm.Update = function () {

      //  GET TICKER VALUE  =
      cexService.GetTicker().then(function(data){
        vm.ticker = data;
      });
    }
    vm.GetProfit = GetProfit;
    
    function GetProfit(){
      vm.profit = vm.ticker.last * vm.balance.BTC.available; 
    };

    return vm;
  }]);