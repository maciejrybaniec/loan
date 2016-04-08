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
  /**
   * Get popular providers based on rating
   * @method getPopularProviders
   * @return {object} promise object
   */
  getPopularProviders() {
    var $this = this;
    var defer = q.defer();

    Provider.find({}, null, { sort: {rating: -1}, limit: 7 },
    function(err, docs) {
      console.log(docs);

      if (err || docs === null) {
        return defer.reject();
      }

      defer.resolve(docs);
    });
    return defer.promise;
  }
};
