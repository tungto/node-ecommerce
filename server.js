const dotenv = require('dotenv');
const { app, interval } = require('./src/app');
const { checkOverload } = require('./src/helpers/check.connect');

dotenv.config();

const PORT = 3000 || process.env.PORT;

const server = app.listen(PORT, () => {
	console.log('Server started with port ' + PORT);
});

// todo why?
process.on('SIGINT', () => {
	server.close(() => {
		// exit the process
		clearInterval(interval);
		console.log('Server Express Exited');
	});
});
