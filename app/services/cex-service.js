app.factory('cexService', function ($q, $rootScope, $http) {

    var lastNonce = 0;

    return {
        //returns a json of account balance
        GetBalance : function () {
            return $q(function (resolve, reject) {
                var url = 'https://cex.io/api/balance/';
                $http.post(url, GetRequestSignature())
                    .success(function (data, status, headers, config) {
                        resolve(data);
                    }).error(function (data, status, header, config) {
                        reject(data);
                });
            });
        },

        GetTicker : function(){
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: 'https://cex.io/api/ticker/BTC/USD'
                  }).then(function successCallback(response) {
                    resolve(response.data);
                  }, function errorCallback(response) {
                     reject("ERROR" + response);
                  });
            });
        }
    }


    //returns the data package for the API calls
    function GetRequestSignature() {
        var APIInfo = $rootScope.APIInfo;
        return data = {
            key: APIInfo.apiKey,
            signature: GenerateSignature(),
            nonce: lastNonce
        }
    }

    //utility: returns signature for private API calls
    function GenerateSignature() {
        var APIInfo = $rootScope.APIInfo;
        lastNonce = GetNonce();
        var message = lastNonce + APIInfo.userID + APIInfo.apiKey;
        return CryptoJS.HmacSHA256(message, APIInfo.apiSecret).toString(CryptoJS.enc.Hex).toUpperCase();
    }

    //utility: returns nonce for api
    function GetNonce() {
        return Math.round((new Date()).getTime() / 1000);
    }

});


