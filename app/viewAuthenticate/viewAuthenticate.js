'use strict';

angular.module('striderCEX.viewAuthenticate', ['ngRoute'])
  .controller('ViewAuthenticateCtrl', ['$http', '$rootScope','cexService', function ($http, $rootScope, cexService) {

    /* VARS */
    var vm = this;
    vm.userID = "gasdgas";
    vm.apiKey = "adgasgas";
    vm.apiSecret = "asdgasgas";
    vm.ValidateInfo = ValidateInfo;
    vm.authSuccess = false;
    vm.authStatusMessage = 'Waiting to login...';
     
    function ValidateInfo() {
      //PLACE INFO INTO ROOT SCOPE

      //define root scope object for API calls
      $rootScope.APIInfo = {
        userID: vm.userID,
        apiKey: vm.apiKey,
        apiSecret: vm.apiSecret
      };

      //Do an API call to determine if info works
      cexService.GetBalance().then(function (data) {
        if(data.error){
          vm.authStatusMessage = "Invalid infomation entered - try again";
          vm.authFailed = true;
          console.log("Invalid info");
        }else{
          vm.authSuccess = true;
          vm.authStatusMessage = "You are now authorized";
        }
      });
    }

    return vm;
  }]);