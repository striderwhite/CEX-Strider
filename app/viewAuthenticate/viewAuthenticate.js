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

    vm.apiKey = 'FAKEFAKEFAKEFAKE';
    vm.apiSecret = 'FAKEFAKEFAKEFAKE';
    vm.userID = 'upFAKEFAKEFAKE07';
    vm.message = GetNonce() + vm.userID + vm.apiKey;

    
    vm.signature = CryptoJS.HmacSHA256(vm.message,vm.apiSecret).toString(CryptoJS.enc.Hex).toUpperCase();

    console.log(vm.signature);
    
    return vm;
  }]);


  function GetNonce(){
    return Math.round((new Date()).getTime() / 1000);
  }