var mongoose = require("mongoose");
var host = process.env.MONGOHQ_URL || "mongodb://@127.0.0.1:27017/mail";

mongoose.connect(host);

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

var mailSchema = new mongoose.Schema({
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true,
	},
	subject: {
		type: String
	},
	text: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
})

var user = mongoose.model('user',UserSchema);
var mail = mongoose.model('mail',mailSchema);

var db = {};
module.exports = db

db.checkLoginPassword = function(username, password, callback) {
	var query = user.find({'username': username});
	query.exec(function(err, result) {
		if (err) {
			console.log('error checking for user', error)
		} else {
			console.log('does',password,'equal',result[0].password)
			if(password === result[0].password){
				callback(username)
			} else {
				callback('Wrong password')
			}
		}
	})
}

db.findMail = function (username, callback) {
	var query = mail.find({'to':username}).sort({date: 'desc'})
	query.exec(function (err, result) {
		if (err) {
			console.log('Mail retrieval error', error)
		} else {
			callback(result)
		}
	})
}

db.createMail = function (from,to,subject,text,callback) {
	var newMail = new mail ({
		from: from,
		to: to,
		subject: subject,
		text: text
	});
	newMail.save(function (err) {
		if(err) {
			console.log('Error on new mail save', err);
			callback('Failed')
		} else {
			console.log('Saving mail');
			callback(newMail);
		}
	})
}

db.createUser = function(username, password, callback) {
	console.log('inside name checker')
	var query = user.find({'username': username})
	query.exec(function (err, result) {
		if(err){
			console.log('checkForUser error', error)
		} else {
			console.log('the namechecker result was ',result)
			if(result.length>=1){
				console.log('name already taken')
				callback('Already taken')
			} else {
				console.log('creating user')
				var newUser = new user ({
					username: username,
					password: password
				});
				newUser.save(function(err) {
					if(err){
						console.log('Error on Save!', err);
					} else {
						console.log('created user',username)
						callback(username)
					}
				})
			}
		}
	})
} 

// db.createUser = function(username, password, callback) {
// 	console.log('inside create user')
// 	console.log('username and pass', username, password)
// 	var userExists = db.checkForUser(username);
// 	console.log(userExists)
// 	if(!userExists){
// 		var newUser = new user ({
// 			username: username,
// 			password: password
// 		});
// 		newUser.save(function(err) {
// 			if(err){
// 				console.log('Error on Save!', err);
// 			}
// 			console.log('saved user',username)
// 			callback(username)
// 		})
// 	} else {
// 		console.log('name already taken')
// 		callback('Already taken')
// 	}
// }


// var server = new mongodb.Server("127.0.0.1", 27017, {});
// var client = new mongodb.Db('gmail', server);

// client.open(function(err, p_client) {
// 	console.log("Connected to MongoDB!");

// 	client.createCollection("mail", function(err, collection) {
// 		console.log('Created mail collection');
// 		collection.count(function(err, count) {
// 			console.log("This collection contains ",count," documents.")
// 		})
// 	})


// })




