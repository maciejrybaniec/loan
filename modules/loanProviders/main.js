/* Module Main */

var Filarum = require('./filarum');

module.exports = {
  /**
   * Handle filarum provider
   * @param {object} [arguments] request arguments
   * @method filarum
   */
  filarum: function(arguments) {
    Filarum.handleDataCrawl();
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
