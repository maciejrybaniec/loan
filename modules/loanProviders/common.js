/* Common */
var config = require('./../../config');

module.exports = {
  /**
   * Randomize crawler userAgent
   * @method randomUserAgent
   */
  randomUserAgent: function() {
    var index = Math.floor((Math.random() * (config.crawler.userAgents.length)) + 0);
    return config.crawler.userAgents[index];
  },
};
