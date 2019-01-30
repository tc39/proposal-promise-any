var tape = require('tape');
var any = require('./any');

tape('any', t => {
	t.plan(2);

	t.test('resolves with first resolved promise', assert => {
		any([Promise.reject('foo'), Promise.resolve('bar')]).then(result => {
			assert.equals(result, 'bar');
			assert.end();
		});
	});

	t.test('rejects with an array of rejected reasons', assert => {
		any([Promise.reject('foo'), Promise.reject('bar')]).catch(result => {
			assert.equals(result[0], 'foo');
			assert.equals(result[1], 'bar');
			assert.end();
		});
	});


});
