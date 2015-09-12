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
   * @param {object} [arguments] request arguments
   * @method handleDataCrawl
   */
  handleDataCrawl: function(arguments) {
    var $this = this;
    /* Create phantom instance */
    driver.create({
      path: phantomjs.path,
      parameters: {
        'ignore-ssl-errors': 'yes',
      }
    }, function(error, browser) {
      browser.createPage(function(err, page) {
        $this.crawlPageData(page, function(data) {

        });
      });
    });
  },
  /**
   * Create phantom instance for provider
   * @param {object} [page] phantom page object
   * @param {function} [done] callback function
   * @method crawlPageData
   */
  crawlPageData: function(page, done) {
    page.set('settings.userAgent', common.randomUserAgent, function() {
      page.open(website, function(error, status) {
        if (status === 'fail') {
          errorHandler.logError('provider', website);
          done(false);
          return false;
        }

        page.includeJs(config.jQueryURL, function(error) {
          if (error) {
            errorHandler.logError('provider', website);
            done(false);
            return false;
          }

          page.evaluate(function() {

            $('#amountPlus').trigger('click');

            var a = $('#loanAmount-label').text();
            return {
              a: a,
            }

          }, function(error, result) {
            console.log(result);

          });
        });
      });
    });
  },
};
