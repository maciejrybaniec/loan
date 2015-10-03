/* Modules Import */
var express = require('express'),
  config = require('./config'),
  mongoose = require('mongoose'),
  router = express.Router();

var Comparison = require('./modules/comparison');
var viewMainTemplate = config.mainTemplate;

/* Connect to MongoDB */
var databaseConnection = mongoose.connect(config.mongodb);

/* Models */
var ComparisonModel = new Comparison(databaseConnection);

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

/* API routes */
router.post('/api/compare', ComparisonModel.handleRequest.bind(ComparisonModel));



module.exports = router;
