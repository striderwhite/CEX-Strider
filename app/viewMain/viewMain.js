'use strict';

angular.module('striderCEX.viewMain', ['ngRoute'])
  .controller('ViewMainCtrl', ['$http', '$interval', function ($http, $interval) {

    /* VARS */
    var vm = this;
    vm.updater;
    vm.ticker;
    vm.numberOfCoins = 1;
    vm.profit;
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
      $http({
        method: 'GET',
        url: 'https://cex.io/api/ticker/BTC/USD'
      }).then(function successCallback(response) {
        vm.ticker = response.data;
        /* if(response.data.last > vm.ticker.last){vm.isUp=true;} else { vm.isUp=false;} */
      }, function errorCallback(response) {
        console.log("ERROR" + response);
      });


    }

    var apiKey = 'OgxD6vdPwKPkw2ciepZwGbVI';
    var apiSecret = 'IgeIo7KyEPfKCMbLOkpc4MkNOV4';
    var userID = 'up112311707';

    var message = GetNonce() + userID + apiKey;

    var signature = CryptoJS.HmacSHA256(message, apiSecret).toString(CryptoJS.enc.Hex).toUpperCase();

    vm.GetProfit = GetProfit;
    
    function GetProfit(){
      vm.profit = vm.ticker.last * vm.numberOfCoins; 
    };

    console.log(signature);

    return vm;
  }]);


function GetNonce() {
  return Math.round((new Date()).getTime() / 1000);
}
