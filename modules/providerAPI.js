Provider = require('./models/Provider');
q = require('q');
'use strict';

module.exports = {
  /**
   * Get provider details from databse
   * @param {string} [provider] provider name
   * @method getProviderDetails
   */
  getProviderDetails: function(provider) {
    var $this = this;
    var defer = q.defer();

    Provider.findOne({
      'name': provider,
    }, function(err, doc) {
      if (err || doc === null) {
        return defer.reject();
      }

      defer.resolve(doc);
    });
    return defer.promise;
  },
};
