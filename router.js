/* Modules Import */
var express = require('express'),
  config = require('./config'),
  mongoose = require('mongoose'),
  router = express.Router();

var Comparison = require('./modules/comparison');
var Redirect = require('./modules/redirect');
var Detail = require('./modules/detail');
var viewMainTemplate = config.mainTemplate;

/* Connect to MongoDB */
var databaseConnection = mongoose.connect(config.mongodb);

/* Models */
var RedirectModel = new Redirect(databaseConnection);
var ComparisonModel = new Comparison(databaseConnection);
var DetailModel = new Detail(fdatabaseConnection);

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

router.get('/redirect/:provider', RedirectModel.handleRequest.bind(RedirectModel));

/* API routes */
router.post('/api/compare', ComparisonModel.handleRequest.bind(ComparisonModel));
router.post('/api/detail', )


module.exports = router;
