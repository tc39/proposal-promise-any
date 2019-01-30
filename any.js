module.exports = function any(promises) {
	return Promise.all(
		promises.map(promise =>
			promise.then(val => {
				throw val;
			}, reason => reason),
		),
	).then(reasons => {
		throw reasons;
	}, firstResolved => firstResolved);
}
