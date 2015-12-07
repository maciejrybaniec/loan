var config = require('./../config'),
  nodemailer = require('nodemailer'),
  Provider = require('./models/Provider'),
  Loan = require('./models/Loan'),
  EmailTemplate = require('email-templates').EmailTemplate,
  path = require('path'),
  fs = require('fs'),
  q = require('q');

  var smtpTransport = require('nodemailer-smtp-transport');
  var transporter = nodemailer.createTransport(smtpTransport({
      host: 'mail6.mydevil.net',
      port: 25,
      auth: {
          user: 'kontakt@bankierski.pl',
          pass: 'Maciej4586'
      }
  }));


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

    var templateDir = path.join('views', 'emails'),
      notificationEmail = new EmailTemplate(templateDir);

    /* Setup email options */
    notificationEmail.render({
      'loanData': $this.loanData,
      'provider': $this.provider,
    }, function(error, result) {
      if (error) {
        defer.reject(false);
        return false;
      }

      var mailOptions = {
        from: 'Bankierski.pl <kontakt@bankierski.pl>',
        to: email,
        subject: 'Bankierski.pl - oferta pożyczkodawcy ' + $this.loanData.name,
        html: result.html,
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          defer.reject(false);
        } else {
          console.log('Message sent: ' + info.response);
          defer.resolve(true);
        }
      });
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
