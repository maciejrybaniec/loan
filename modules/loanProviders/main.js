/* Module Main */

var Filarum = require('./filarum');

module.exports = {
  /**
   * Handle filarum provider
   * @param {object} [data] request arguments
   * @method filarum
   */
  filarum: function(data, done) {
    Filarum.handleDataCrawl(data, function(compareData) {

    });
  },

  /**
   * Handle netcredit provider
   * @param {object} [arguments] request arguments
   * @method netcredit
   */
  netcredit: function(arguments) {
    console.log('netcredit');
  },

};
