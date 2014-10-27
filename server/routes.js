var bodyParser = require('body-parser');
var db = require('./dbUtil.js');


module.exports = function(app) {

	app.post('/login', function (req, res) {
		db.checkLoginPassword(req.body.username,req.body.password, function(result) {
			res.send(result)
		})
		// console.log(req.body)
		// res.send(req.body.username)
	})

	app.post('/signup', function (req, res) {
		db.createUser(req.body.username,req.body.password,function(result){
			res.send(result)
		})
		
	})

	app.post('/compose', function (req, res) {
		var from = req.body.username
		var to = req.body.address
		var subject = req.body.subject
		var text = req.body.text
		db.createMail(from, to, subject, text, function (result) {
			res.send(result)
		})
	})

	app.post('/inbox', function (req, res) {
		var username = req.body.username;
		db.findMail(username, function (result) {
			res.send(JSON.stringify(result));
		})
		// var inboxItems = ['Doug says hi','Remember to feed the cat','SUP YOOOO']
		// JSON.stringify(inboxItems)
		// res.send(inboxItems)
	})
}