var config = require('./../config'),
  Provider = require('./models/Provider');

/* Detail module */
function Detail(database) {
  this.database = database;
  'use strict';
}

Detail.prototype = {
  /**
   * Handle redirect request
   * @param {object} [req] request object
   * @param {object} [res] response object
   * @method handleRequest
   */
  handleRequest: function(req, res) {
    Provider.findOne({
      'name': req.body.provider,
    }, function(err, doc) {
      if (err || doc === null) {
        console.log(err, doc);
        res.status(500);
        res.json({});
        return false;
      }

      res.status(200);
      res.json(doc);
    });
  },
};

module.exports = Detail;
