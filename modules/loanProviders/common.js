/* Common */
var config = require('./../../config'),
  date = require('date-format-lite'),
  accounting = require('accounting'),
  moment = require('moment');

module.exports = {
  /**
   * Randomize crawler userAgent
   * @method randomUserAgent
   */
  randomUserAgent: function() {
    var index = Math.floor((Math.random() * (config.crawler.userAgents.length)) + 0);
    return config.crawler.userAgents[index];
  },
  /**
   * Format money in standard pattern
   * @param {string} [money] money
   * @method formatMoney
   */
  formatMoney: function(money) {
    var clearMoney = money.replace(/zł/i, '').trim();
    return accounting.formatMoney(clearMoney, {
      symbol: 'zł',
      format: "%v %s"
    }, 2, ".", ",");
  },
  /**
   * Format rrso in standard pattern
   * @param {string} [money] money
   * @method formatRrso
   */
  formatRrso: function(money) {
    var clearMoney = money.replace(/%/i, '').trim();
    return accounting.formatMoney(clearMoney, {
      symbol: '%',
      format: "%v %s"
    }, 2, ".", ",");
  },
  /**
   * Convert days to month number peroid
   * @param {string} [days] days number
   * @method convertDaysToMonthNumer
   */
  convertDaysToMonthNumer: function(days) {
    return Math.round(days / 30);
  },
  /**
   * Convert days to month number peroid
   * @param {array} [a] array with values
   * @param {array} [x] mid value
   * @method getClosestValues
   */
   getClosestValues: function(a, x) {
    var lo = -1,
      hi = a.length;
    while (hi - lo > 1) {
      var mid = Math.round((lo + hi) / 2);
      if (a[mid] <= x) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    if (a[lo] == x) hi = lo;
    return [a[lo], a[hi]];
  },
  /**
   * Calculate payment date
   * @param {Number} [days] days to add
   * @method getPaymentDate
   */
  getPaymentDate: function(days) {
    return moment().add(days, 'days').format('DD-MM-YYYY');
  },
  /**
   * Create standard format from date
   * @param {string} [dateString] Date in string format
   * @method formatDate
   */
  formatDate: function(dateString) {
    return dateString.date('DD-MM-YYYY');
  },
};
