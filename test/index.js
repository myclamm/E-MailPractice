var shutdown = require('../server.js').shutdown,
	superagent = require('superagent'),
	expect = require('expect.js');

describe('homepage', function() {
	it('should respont to GET', function(done){
		superagent.get('http://localhost:3000')
		.end(function(res){
			expect(res.status).to.equal(200);
			done();
		})
	});
})

after(function() {
	shutdown();
})