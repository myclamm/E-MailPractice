var shutdown = require('../server.js').shutdown,
	superagent = require('superagent'),
	expect = require('expect.js');

describe('The homepage', function() {
	it('should respond to GET', function(done){
		superagent.get('http://localhost:3000')
		.end(function(res){
			expect(res.status).to.equal(200);
			done();
		})
	});
})

describe('The signup functionality', function () {
	it('should not allow duplicate usernames', function(done) {
		superagent.post('http://localhost:3000/signup')
		.send({username:'Mike', password:'123'})
		.end(function(res){
			// console.log(res.body)
			console.log(res.text)
      		expect(res.text).to.equal('Already taken')
      		done();
		})
	})
})

after(function() {
	shutdown();
})