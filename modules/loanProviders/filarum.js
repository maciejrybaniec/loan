/* Filarum provider */
var driver = require('node-phantom-simple'),
  phantomjs = require('phantomjs'),
  config = require('./../../config'),
  common = require('./common'),
  errorHandler = require('./../error');

/* Phantom website */
var website = 'https://www.filarum.pl';

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
          providerData.loanProvider = 'Filarum';
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
    var maxBorrowAmount = config.loanProvidersSettings.filarum.maxPrice,
      amountStart = Number;
    evaluateObject = {
      firstTimeBorrow: false,
      amountElement: '#amountPlus',
      timeElement: '#periodPlus',
      timeClick: 0,
    };

    /* First time borrow */
    if (JSON.parse(searchData.firstTimeBorrow) === true) {
      evaluateObject.firstTimeBorrow = true;
      maxBorrowAmount = 1000;
    }

    /* Price amount */
    if (parseInt(searchData.amount) >= maxBorrowAmount) {
      evaluateObject.amountClick = (maxBorrowAmount - config.loanProvidersSettings.filarum.startPrice) / 50;
    } else {
      amountStart = parseInt(searchData.amount) - config.loanProvidersSettings.filarum.startPrice;
      if (amountStart < 0) {
        evaluateObject.amountElement = '#amountMinus';
      }
      evaluateObject.amountClick = Math.abs(amountStart / 50);
    }

    /* Date amount */
    if (parseInt(searchData.time) < config.loanProvidersSettings.filarum.maxDays) {
      evaluateObject.timeClick = config.loanProvidersSettings.filarum.maxDays - searchData.time;
      evaluateObject.timeElement = '#periodMinus';
    }

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

      page.onConsoleMessage = function(msg) {
        console.log(msg);
      };

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
            $('.loanTypeList li:nth-child(2)').trigger('click');
          }

          /* Calculate amount */
          for (i = 0, amountIteration = pageArguments.amountClick; i < amountIteration; i++) {
            $(pageArguments.amountElement).trigger('click');
          }

          /* Calculate peroid */
          for (j = 0, timeIteration = pageArguments.timeClick; j < timeIteration; j++) {
            $(pageArguments.timeElement).trigger('click');
          }

          return {
            'amount': $('#loanAmount-label').text(),
            'paymentDate': $('#paymentDate-label').text(),
            'commission': $('#commissionAmount-label').text(),
            'total': $('#total-label').text(),
            'rrso': $('#rrso-label').text(),
          };

        }, JSON.stringify(evaluateArguments), function(error, crawlerData) {
          if (error) {
            done(false);
            return false;
          }

          done(crawlerData);
        });
      };

      page.open(website);
    });
  },
};
