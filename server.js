const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config();

const PORT = 3000 || process.env.PORT;

const server = app.listen(PORT, () => {
	console.log('Server started with port ' + PORT);
});

// todo why?
process.on('SIGINT', () => {
	server.close(() => console.log('Server Express Exited'));
});
