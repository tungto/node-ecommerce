const dotenv = require('dotenv');
const { app } = require('./src/app');
const mongoose = require('mongoose');

dotenv.config();

const PORT = 3000 || process.env.PORT;

const server = app.listen(PORT, () => {
	console.log('Server started with port ' + PORT);
});

// todo why?
process.on('SIGINT', () => {
	server.close(() => {
		// exit the process
		// clearInterval(interval);
		mongoose.disconnect();
		console.log('Server Express Exited');
	});
});
