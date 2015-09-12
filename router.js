/* Modules Import */
var express = require('express'),
  config = require('./config'),
  router = express.Router();

var Comparison = require('./modules/comparison');
var viewMainTemplate = config.mainTemplate;



/* Models */
var ComparisonModel = new Comparison();


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
