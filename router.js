/* Modules Import */
var express = require('express'),
  config = require('./config'),
  router = express.Router();

var viewMainTemplate = config.mainTemplate;

router.get('/', function(req, res) {
  return res.render('index', {
    'template': 'main' + viewMainTemplate,
    'headSectionData': config.views.main,
    'templateData': {},
  });
});

router.get('/contact', function(req, res) {
  return res.render('index', {
    'template': 'contact' + viewMainTemplate,
    'headSectionData': config.views.contact,
    'templateData': {},
  });
});

module.exports = router;
