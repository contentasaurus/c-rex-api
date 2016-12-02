var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//==============================================================================

var version = '/v1';
app.use(version + '/blog', require('./routes/blog'));
app.use(version + '/components', require('./routes/components'));
app.use(version + '/datatypes', require('./routes/datatypes'));
app.use(version + '/page-data', require('./routes/page_data'));
app.use(version + '/page-layouts', require('./routes/page_layouts'));
app.use(version + '/page-versions', require('./routes/page_versions'));
app.use(version + '/pages', require('./routes/pages'));
app.use(version + '/script-types', require('./routes/script_types'));
app.use(version + '/scripts', require('./routes/scripts'));
app.use(version + '/site-data', require('./routes/site_data'));
app.use(version + '/users', require('./routes/users'));
app.use(version + '/', require('./routes/index'));

//==============================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
