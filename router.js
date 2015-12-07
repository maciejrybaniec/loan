/* Modules Import */
var express = require('express'),
  config = require('./config'),
  mongoose = require('mongoose'),
  router = express.Router();

var Comparison = require('./modules/comparison');
var Redirect = require('./modules/redirect');
var Detail = require('./modules/detail');
var Notification = require('./modules/notification');
var viewMainTemplate = config.mainTemplate;

/* Connect to MongoDB */
var databaseConnection = mongoose.connect(config.mongodb);

/* Models */
var RedirectModel = new Redirect();
var ComparisonModel = new Comparison();
var NotificationModel = new Notification();
var DetailModel = new Detail();

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

router.get('/conditions', function(req, res) {
  return res.render('index', {
    'template': 'conditions' + viewMainTemplate,
    'headSectionData': config.views.conditions,
    'templateData': {},
  });
});

router.get('/redirect/:provider', RedirectModel.handleRequest.bind(RedirectModel));

/* API routes */
router.post('/api/compare', ComparisonModel.handleRequest.bind(ComparisonModel));
router.post('/api/detail', DetailModel.handleRequest.bind(DetailModel))
router.post('/api/notification', NotificationModel.handleRequest.bind(NotificationModel))

module.exports = router;
