var config = require('./../config');


/* Notification module */
function Notification() {
  'use strict';
}

Notification.prototype = {
  /**
   * Handle redirect request
   * @param {object} [req] request object
   * @param {object} [res] response object
   * @method handleRequest
   */
  handleRequest: function(req, res) {
    res.status(200);
    res.json({});
  },
};

module.exports = Notification;
