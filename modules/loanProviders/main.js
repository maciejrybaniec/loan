/* Module Main */

var Filarum = require('./filarum'),
  Vivus = require('./vivus'),
  Netcredit = require('./netcredit'),
  Ekspreskasa = require('./ekspreskasa'),
  Alior = require('./alior')

module.exports = {
  /**
   * Handle filarum provider
   * @param {object} [data] request arguments
   * @method filarum
   */
  filarum: function(data, done) {
    Filarum.handleDataCrawl(data, function(compareData) {
      done(compareData);
    });
  },
  /**
   * Handle vivus provider
   * @param {object} [data] request arguments
   * @method vivus
   */
  vivus: function(data, done) {
    Vivus.handleDataCrawl(data, function(compareData) {
      done(compareData);
    });
  },
  /**
   * Handle vivus provider
   * @param {object} [data] request arguments
   * @method ekspreskasa
   */
  ekspreskasa: function(data, done) {
    Ekspreskasa.handleDataCrawl(data, function(compareData) {
      done(compareData);
    });
  },
  /**
   * Handle netcredit provider
   * @param {object} [arguments] request arguments
   * @method netcredit
   */
  netcredit: function(data, done) {
    Netcredit.handleDataCrawl(data, function(compareData) {
      done(compareData);
    });
  },
  /**
   * Handle alior provider
   * @param {object} [arguments] request arguments
   * @method alior
   */
  alior: function(data, done) {
    Alior.calculateLoan(data, function(compareData) {
      done(compareData);
    });
  },

};
