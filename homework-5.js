var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5654);

app.get('/homework-5',function(req,res){
  var context = {};
  var queryData = [];
  for (var key in req.query){
    queryData.push({'key': key, 'value': req.query[key]});
  };
  context.dataList = queryData;
  res.render('get-received', context);
});

app.post('/homework-5',function(req,res){
  var context = {};
  var queryData = [];
  for (var key in req.body){
    queryData.push({'key': key, 'value': req.body[key]});
  };
  context.dataList = queryData;
  res.render('post-received', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});