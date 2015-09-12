/* Error Handler */
var fs = require('fs');

module.exports = {
  /**
   * Handle errors
   * @param {string} [errorType] type of error
   * @param {string} [message] error message
   * @method logError
   */
  logError: function(errorType, message) {
    var errorData = this.setError(errorType, message);
    fs.appendFile('erros.log', errorData + '\n');
  },
  /**
   * Set error type
   * @param {string} [errorType] type of error
   * @param {string} [message] error message
   * @method setError
   */
  setError: function(errorType, message) {
    var template = String,
      date = new Date(),
      errorDate = date.getDate() + ':' + date.getMonth() + ':' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

    switch (errorType) {
      case 'provider':
        template = '[' + errorDate + ']' + ' Phantomjs cannot open ' + message;
        break;
    }

    return template;
  },
};
