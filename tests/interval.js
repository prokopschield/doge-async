module.exports = async function () {
	const { setInterval, setTimeout } = require('..');
	const interval = setInterval(() => {
		console.log(new Date);
	}, 1000);
	setTimeout(() => {
		interval.cancel();
		setTimeout(() => {
			process.exit();
		}, 2000)
	}, 5000);
}

module.exports();
