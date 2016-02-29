var config = require('./../config'),
  q = require('q'),
  Loan = require('./models/Loan'),
  Provider = require('./models/Provider');

/* Comparison module */
function Comparison() {
  'use strict';
}

Comparison.prototype = {
  /**
   * Handle comparison service request
   * @param {object} [req] request object
   * @param {object} [res] response object
   * @method handleRequest
   */
  handleRequest: function(req, res) {
    var $this = this;
    var errors = this.validateComparisonArguments(req.body);

    if (errors.length > 0) {
      res.status(500);
      res.json({
        'errors': errors,
      });
      return false;
    }

    var promise = this.getLoanConditions(req.body);

    promise
      .then(function(loans) {
        return $this.getProvidersRating(loans);
      })
      .then(function(providers) {
        res.status(200);
        res.json(providers);
      })
      .catch(function(error) {
        res.status(500);
        res.json({
          'errors': error,
        });
      });
  },
  /**
   * Validate arguments for comparison
   * @param {object} [arguments] request arguments
   * @method validateComparisonArguments
   */
  validateComparisonArguments: function(arguments) {
    var errors = [];

    /**
     * Validate amount argument
     * @param {string} [amount] amount
     * @method handleRequest
     */
    function validateAmount(amount) {
      if (!amount || amount.length === 0) {
        errors.push({
          'name': 'amount',
          'error': 'e_amount'
        });
      }
    }

    /**
     * Validate time argument
     * @param {string} [time] time
     * @method validateTime
     */
    function validateTime(time) {
      if (!time || time.length === 0 || parseInt(time) < 0) {
        errors.push({
          'name': 'time',
          'error': 'e_time'
        });
      }
    }

    /**
     * Validate firstTimeBorrow argument
     * @param {boolean} [firstTimeBorrow] firstTimeBorrow
     * @method validateTime
     */
    function validateFirstTimeBorrow(firstTimeBorrow) {
      if (firstTimeBorrow.length === 0) {
        errors.push({
          'name': 'firstTimeBorrow',
          'error': 'e_firstTimeBorrow'
        });
      }
    }

    validateAmount(arguments.amount);
    validateTime(arguments.time);
    validateFirstTimeBorrow(arguments.firstTimeBorrow);

    return errors;
  },
  /**
   * Get loan conditions for each provider
   * @param {object} [query] request arguments
   * @method getLoanConditions
   */
  getLoanConditions: function(query) {
    var $this = this;
    var defer = q.defer();

    Loan.find({
        'days': query.time,
        'amount': query.amount,
        'firstTime': query.firstTimeBorrow,
      })
      .exec(function(err, docs) {
        if (err) {
          return defer.reject({
            name: 'compare',
            message: 'e_compare',
          });
        }
        defer.resolve(docs);
      });

    return defer.promise;
  },
  /**
   * Get rating value for loan provider
   * @param {object} [loans] Array with Loan models
   * @method getProvidersRating
   */
  getProvidersRating: function(loans) {
    var $this = this;
    var defer = q.defer();
    var loansLength = loans.length;
    var iterator = 0;
    var ratedLoans = [];

    if (loansLength === 0) {
      defer.resolve([]);
    }

    loans.forEach(function(loan) {

      Provider.findOne({
          'name': loan.provider,
        }, {
          'rating': true,
        })
        .exec(function(err, doc) {
          loan.rating = !err ? doc.rating : 0;
          ratedLoans.push(loan);
          iterator++;

          if (iterator === loansLength) {
            defer.resolve(ratedLoans);
          }
        });
    });

    return defer.promise;
  }
}

module.exports = Comparison;
