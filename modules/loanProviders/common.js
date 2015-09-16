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
  /**
   * Dispatch element click event
   * @method elementClick
   */
  elementClick: function(element) {
    var eventDispatch = document.createEvent('MouseEvent');
    eventDispatch.initMouseEvent('click', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(eventDispatch);
  },
};
