'use strict';

angular.module('striderCEX.viewAuthenticate', ['ngRoute'])
  .controller('ViewAuthenticateCtrl', ['$http', function ($http) {

    /* VARS */
    var vm = this;
    vm.signature;
    vm.apiKey;
    vm.apiSecret;
    vm.userID;
    vm.message;
    vm.lastNonce;

    vm.userID = 'up12f';
    vm.apiSecret = 'all12f12f12ZjY';
    vm.apiKey = 'FK12f12fos';
    vm.message = GetNonce() + vm.userID + vm.apiKey;

    
    vm.GenerateSignature = GenerateSignature;

    
    function GenerateSignature () {
      vm.lastNonce = GetNonce();
      vm.message =  vm.lastNonce + vm.userID + vm.apiKey;
      vm.signature = CryptoJS.HmacSHA256(vm.message,vm.apiSecret).toString(CryptoJS.enc.Hex).toUpperCase();
    }

    vm.ValidateInfo = function(){
      GenerateSignature();

      var url = 'https://cex.io/api/balance/';
      var data = {
        key : vm.apiKey,
        signature : vm.signature,
        nonce : vm.lastNonce
      }

      $http.post(url, data)
      .success(function (data, status, headers, config) {
        console.log("Response back");
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      })
      .error(function (data, status, header, config) {
        console.log("Error");
        console.log(data);
      });


    }

    return vm;
  }]);


  function GetNonce(){
    return Math.round((new Date()).getTime() / 1000);
  }
