var express = require('express'),
  consolidate = require('consolidate'),
  bodyParser = require('body-parser'),
  ejs = require('ejs');

var Router = require('./router');
var app = express();

app.engine('ejs', consolidate.ejs);
app.set('view engine', 'ejs');
app.set('view cache', false);
app.set('views', __dirname + '/views');


/* APP Config */
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

app.use(bodyParser.json({
  limit: '50mb',
   extended: true,
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use('/', express.static(__dirname + '/public'));

app.use('/', Router);
app.listen(8000);
console.log('server starts');
