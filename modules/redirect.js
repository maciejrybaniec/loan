var config = require('./../config'),
  Affiliation = require('./models/Affiliation');

var viewMainTemplate = config.mainTemplate;

/* Redirect module */
function Redirect() {
  'use strict';
}

Redirect.prototype = {
  /**
   * Handle redirect request
   * @param {object} [req] request object
   * @param {object} [res] response object
   * @method handleRequest
   */
  handleRequest: function(req, res) {
    Affiliation.findOne({
      'name': req.params.provider,
    }, function(err, doc) {
      return res.render('redirect/index', {
        'headSectionData': config.views.redirect,
        'templateData': {
          redirect: doc,
          distributorId: config.distributorId,
          redirectTime: config.redirectTime,
        },
      });
    });
  },
};

module.exports = Redirect;
