var express = require('express');
var app = express();
require('./server/config.js')(app,express);
require('./server/routes.js')(app);

var port = process.env.PORT || 3000;
var url = process.env.URL || 'localhost';
app.listen(port,url);
console.log('Listening on',url,':',port);