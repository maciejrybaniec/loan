var config = require('./../config'),
  providerHandler = require('./loanProviders/main');

/* Comparison module */
function Comparison(db) {
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

    this.validateComparisonArguments(req.body, function(errors) {

      if (errors.length > 0) {
        res.status(500);
        res.json({
          'errors': errors,
        });
        return false;
      }

      $this.getLoanConditions(req.body, function() {

      });

      res.status(200);
      res.json({});

    });
  },
  /**
   * Validate arguments for comparison
   * @param {object} [arguments] request arguments
   * @method validateComparisonArguments
   */
  validateComparisonArguments: function(arguments, done) {
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
      if (!firstTimeBorrow || firstTimeBorrow.length === 0) {
        errors.push({
          'name': 'firstTimeBorrow',
          'error': 'e_firstTimeBorrow'
        });
      }
    }

    validateAmount(arguments.amount);
    validateTime(arguments.time);
    validateFirstTimeBorrow(arguments.firstTimeBorrow);

    done(errors);
  },

  /**
   * Get loan conditions for each provider
   * @param {object} [data] request arguments
   * @param {function} [callback] callback function
   * @method getLoanConditions
   */
  getLoanConditions: function(data, callback) {
    config.loanProviders.forEach(function(provider) {
      providerHandler[provider](data);
    });
  },
}

module.exports = Comparison;
