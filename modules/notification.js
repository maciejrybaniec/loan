var config = require('./../config'),
  nodemailer = require('nodemailer'),
  Provider = require('./models/Provider'),
  Loan = require('./models/Loan'),
  q = require('q');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'projekt.wpc.uek@gmail.com',
    pass: 'projektuek'
  }
});

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
    var $this = this;
    this.$errorCode = 500;
    /**
     * Send response errors
     * @method sendresponseErrors
     */
    function sendResponseErrors() {
      res.status($this.$errorCode);
      res.json({});
    }

    var getLoanData = this.getLoanData(req.body.id);
    //  this.saveNotification(req.body.email, req.body.provider);

    getLoanData.then(function(document) {
        $this.loanData = document;
        return $this.getProviderDetail(req.body.provider);
      })
      .then(function(provider) {
        $this.provider = provider;
        return $this.sendEmail(req.body.email);
      })
      .then(function(status) {
        res.status(200);
        res.json({});
      })
      .catch(function(error) {
        sendResponseErrors();
      });
  },
  saveNotification: function(email, provider) {
    //  Notification.create({
    //    'provider': provider,
    //    'email': email,
    //    });
  },
  sendEmail: function(email) {
    var $this = this,
      defer = q.defer();

    /* Setup email options */
    var mailOptions = {
      from: 'Bankierski.pl <projekt.wpc.uek@gmail.com>',
      to: email,
      subject: 'Bankierski.pl - oferta pożyczkodawcy ' + $this.loanData.name,
      text: 'Test',
      html: 'Test',
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        defer.reject(false);
      } else {
        console.log('Message sent: ' + info.response);
        defer.resolve(true);
      }
    });

    return defer.promise;
  },
  getLoanData: function(id) {
    var $this = this,
      defer = q.defer();

    Loan.findOne({
      _id: id
    }, function(error, document) {
      if (error) {
        defer.reject(false);
      }
      if (document) {
        defer.resolve(document);
      }
    });
    return defer.promise;
  },
  getProviderDetail: function(provider) {
    var $this = this,
      defer = q.defer();

    Provider.findOne({
      name: provider
    }, function(error, document) {
      if (error) {
        defer.reject(false);
      }
      if (document) {
        defer.resolve(document);
      }
    });
    return defer.promise;
  },
};

module.exports = Notification;
