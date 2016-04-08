var Loan = require('./../models/Loan');
var q = require('q');
var _ = require('underscore');
'use strict';

module.exports = {
  /**
   * Get random loans for provider
   * @param {string} [provider] provider name
   * @method getRandomLoans
   */
  getRandomLoans: function(provider) {
    var $this = this;
    var defer = q.defer();

    Loan.find({
      'provider': provider,
    }, function(err, docs) {
      if (err || docs === null) {
        return defer.reject();
      }

      defer.resolve(_.sample(docs, 3));
    });
    return defer.promise;
  },
};
