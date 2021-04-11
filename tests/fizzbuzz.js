module.exports = async function fizzbuzz () {
	const { ExecutionQueue } = require('..');
	ExecutionQueue.set({
		fn: (n) => {
			n += 1;
			let s = '';
			if (n % 3 === 0) s += 'fizz';
			if (n % 5 === 0) s += 'buzz';
			if (!s) s = n;
			console.log(s);
			return n;
		},
		state: 0,
		requeue: 200,
	});
	return new Promise(resolve => {});
}
