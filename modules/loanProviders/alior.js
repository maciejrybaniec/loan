/* Vivus provider */
var config = require('./../../config'),
  common = require('./common'),
  request = require('request'),
  errorHandler = require('./../error');

module.exports = {
  /**
   * Calculate loan
   * @param {object} [data] request arguments
   * @param {function} [done] callback function
   * @method calculateLoan
   */
  calculateLoan: function(data, done) {
    var $this = this;

    var amountData = [
      500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 17000, 20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000
    ];

    var periodData = [90, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080, 1440, 1800, 2160, 2520, 2880, 3240, 3600];

    var amount = common.getClosestValues(amountData, parseInt(data.amount))[0],
      period = common.getClosestValues(periodData, data.time)[1],
      step = periodData.indexOf(period);


    function calcFn(step, amount, period) {
      var currentAmount = amount;
      if (step < 12) {
        currentPeriod = (step + 1) * 3;
      } else {
        currentPeriod = (-12 * (18 - 7 - step)) + 36;
      }

      if (currentPeriod <= 12) {
        currentFee = 0.95;
      } else if (currentPeriod > 12 && currentPeriod <= 24) {
        currentFee = 0.9;
      } else if (currentPeriod > 24 && currentPeriod <= 36) {
        currentFee = 0.85;
      } else if (currentPeriod > 36 && currentPeriod <= 48) {
        currentFee = 0.8;
      } else if (currentPeriod > 48 && currentPeriod <= 60) {
        currentFee = 0.75;
      } else if (currentPeriod > 60 && currentPeriod <= 72) {
        currentFee = 0.71;
      } else if (currentPeriod > 72 && currentPeriod <= 84) {
        currentFee = 0.67;
      } else if (currentPeriod > 84 && currentPeriod <= 96) {
        currentFee = 0.65;
      } else if (currentPeriod > 96) {
        currentFee = 0.64;
      }

      currentResult = (currentAmount / currentFee) * (1 + (1 / ((Math.pow((1 + (0.05 / 12)), currentPeriod)) - 1))) * (0.05 / 12);
      return (parseFloat(currentResult) * (periodData[step] / 30)).toFixed(2);
    };

    var calcualteAmount = calcFn(step, amount, period);

    done({
      'amount': common.formatMoney(amount.toString()),
      'commission': common.formatMoney((calcualteAmount - amount).toString()),
      'paymentDate': common.getPaymentDate(period),
      'total': common.formatMoney(calcualteAmount.toString()),
      'loanProvider': 'alior',
    });
  },
};
