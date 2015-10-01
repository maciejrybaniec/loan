'use strict';

angular.module('bsApp.compare-service', [])
  .service('compareService', ['$http', 'appConfig', function($http, appConfig) {
    /**
     * Get loan providers offers data
     * @param {object} [requestObject] request data
     * @param {function} [callback] callback function
     * @method getLoanProviders
     */
    function getLoanProviders(requestObject, callback) {
      var promise = $http({
        method: 'POST',
        data: requestObject,
        url: appConfig.apiUrl + '/compare'
      }).then(function successCallback(response) {
        callback(response.data);
      }, function errorCallback() {
        callback(false);
      });
    }
    return ({
      'getLoanProviders': getLoanProviders
    });
  }]);
