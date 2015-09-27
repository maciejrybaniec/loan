/* Vivus provider */
var config = require('./../../config'),
  common = require('./common'),
  request = require('request'),
  errorHandler = require('./../error');

/* Website */
var website = 'https://www.vivus.pl/api/application/';

module.exports = {
  /**
   * Handle loan data for loan provider
   * @param {object} [data] request arguments
   * @param {function} [done] callback function
   * @method handleDataCrawl
   */
  handleDataCrawl: function(data, done) {
    var $this = this,
      defaultLoanState = 'first-loan-offer',
      propertiesObject = this.createRequestObject(data);

    if (JSON.parse(data.firstTimeBorrow) === false) {
      defaultLoanState = 'next-loan-offer';
    }

    request({
      url: website + defaultLoanState,
      qs: propertiesObject,
    }, function(error, response, body) {
      if (error) {
        done(false);
        return;
      }

      if (response.statusCode === 200) {
        var responseJSON = JSON.parse(body),
          returnObject = {
            'amount': common.formatMoney(responseJSON.newPrincipal.toString()),
            'commission': common.formatMoney(responseJSON.totalInterest.toString()),
            'paymentDate': common.formatDate(responseJSON.agreementEndDate.toString()),
            'total': common.formatMoney((responseJSON.totalInterest + responseJSON.newPrincipal).toString()),
            'rrso': common.formatRrso(responseJSON.annualPercentageRate.toString()),
            'loanProvider': 'vivus',
          };
        done(returnObject);
        return true;
      }
      done(false);
      return;
    });
  },
  /**
   * Create request object for loan provider
   * @param {object} [data] request arguments
   * @method createRequestObject
   */
  createRequestObject: function(data) {
    var maxBorrowAmount = config.loanProvidersSettings.vivus.maxPrice,
      object = {
        'term': data.time,
        'amount': data.amount,
      };

    if (JSON.parse(data.firstTimeBorrow) === true) {
      maxBorrowAmount = 1600;
    }

    if (parseInt(data.time) > 30) {
      object.term = 30;
    }

    if (parseInt(data.amount) > maxBorrowAmount) {
      object.amount = maxBorrowAmount;
    }

    return object;
  },
};
