'use strict';
angular.module('bsApp.provider-service', [])
  .service('providerService', ['$http', '$q', 'appConfig', function($http, $q, appConfig) {
    /**
     * Get provider detail based by name
     * @param {string} [name] provider name
     * @method getProviderDetail
     */
    function getProviderDetail(name) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        data: {
          'provider': name,
        },
        url: appConfig.apiUrl + '/detail'
      }).then(function(response) {
        deferred.resolve(response.data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
    /**
     * Find provider based on passed attributes
     * @param {object} [array] object with providers
     * @param {string} [attribute] attribute
     * @param {string} [value] value
     * @method findProvider
     */
    function findProvider(array, attribute, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attribute] === value) {
          return i;
        }
      }
    }

    return ({
      'getProviderDetail': getProviderDetail,
      'findProvider': findProvider,
    });
  }]);
