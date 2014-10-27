var express = require('express');
var app = express();
require('./server/config.js')(app,express);
require('./server/routes.js')(app);

var port = process.env.PORT || 3000;

var server = app.listen(port);
console.log('Listening on',port);

exports.shutdown = function() {
	server.close();
}