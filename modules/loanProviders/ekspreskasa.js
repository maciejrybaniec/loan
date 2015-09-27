/* netcredit provider */
var driver = require('node-phantom-simple'),
  phantomjs = require('phantomjs'),
  config = require('./../../config'),
  common = require('./common'),
  errorHandler = require('./../error');

/* Phantom website */
var website = 'https://www.ekspreskasa.pl/';

module.exports = {
  /**
   * Create phantom instance for provider
   * @param {object} [data] request arguments
   * @param {function} [done] callback function
   * @method handleDataCrawl
   */
  handleDataCrawl: function(data, done) {

    var $this = this;
    /* Create phantom instance */
    driver.create({
      path: phantomjs.path,
      parameters: {
        'ignore-ssl-errors': 'yes',
      }
    }, function(error, browser) {
      browser.createPage(function(err, page) {
        if (err) {
          done(false);
          return false;
        }
        $this.crawlPageData(page, data, function(providerData) {
          providerData.loanProvider = 'ekspreskasa';
          done(providerData);
          browser.exit();
        });
      });
    });
  },
  /**
   * Checks max length of days calculator moves
   * @param {object} [searchData] compare arguments
   * @method createEvaluateArguments
   */
  createEvaluateArguments: function(searchData) {
    var maxBorrowAmount = config.loanProvidersSettings.ekspreskasa.maxPrice,
      amountStart = Number;
    evaluateObject = {
      firstTimeBorrow: false,
      timeClick: 0,
    };

    /* First time borrow */
    if (JSON.parse(searchData.firstTimeBorrow) === true) {
      evaluateObject.firstTimeBorrow = true;
      maxBorrowAmount = 1500;
    }

    /* Price amount */
    if (parseInt(searchData.amount) >= maxBorrowAmount) {
      if (evaluateObject.firstTimeBorrow) {
        evaluateObject.amountClick = 14;
      } else {
        evaluateObject.amountClick = 19;
      }
    } else {
      amountStart = Math.round(parseInt(searchData.amount) / 100) - 1;
      evaluateObject.amountClick = amountStart;
    }

    evaluateObject.timeClick = searchData.time;

    return evaluateObject;
  },
  /**
   * Create phantom instance for provider
   * @param {object} [page] phantom page object
   * @param {object} [searchData] compare arguments
   * @param {function} [done] callback function
   * @method crawlPageData
   */
  crawlPageData: function(page, searchData, done) {
    var $this = this;

    page.set('settings', {
      'userAgent': common.randomUserAgent(),
      'javascriptEnabled': true,
      'loadImages': false,
    }, function() {

      page.onInitialized = function() {
        page.evaluate(function(domContentLoadedMsg) {
          document.addEventListener('DOMContentLoaded', function() {}, false);
        }, page.onDOMContentLoaded);
      };

      /* Called when DOM is ready */
      page.onDOMContentLoaded = function() {
        var evaluateArguments = $this.createEvaluateArguments(searchData);

        page.evaluate(function(args) {
          var pageArguments = JSON.parse(args);

          if (pageArguments.firstTimeBorrow === false) {
            jQuery('#tab2-link').click();
          }

          jQuery('#calc_slider_loan_amount').slider( 'option', 'value', pageArguments.amountClick);

          if (pageArguments.timeClick <= 15) {
            jQuery('#calc_button_loan_term_0').click();
          } else {
            jQuery('#calc_button_loan_term_1').click();
          }


          return {
            'amount': jQuery('#calc_output_loan_amount').text(),
            'paymentDate': jQuery('#calc_output_loan_duedate').text(),
            'commission': jQuery('#calc_output_loan_expenses').text(),
            'total': jQuery('#calc_output_loan_total').text(),
            'rrso': jQuery('#calc_output_loan_apr').text().replace('%', ' %'),
          };

        }, JSON.stringify(evaluateArguments), function(error, crawlerData) {
          if (error) {
            done(false);
            return false;
          }
          crawlerData.paymentDate = common.formatDate(crawlerData.paymentDate);
          crawlerData.amount = common.formatMoney(crawlerData.amount);
          crawlerData.commission = common.formatMoney(crawlerData.commission);
          crawlerData.total = common.formatMoney(crawlerData.total);
          crawlerData.rrso = common.formatRrso(crawlerData.rrso.toString());
          done(crawlerData);
        });
      };
      page.open(website);
    });
  },
};
