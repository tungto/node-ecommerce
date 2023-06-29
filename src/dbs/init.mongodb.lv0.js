'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectString = process.env.MONGODB_URL;

mongoose
	.connect(connectString)
	.then(() => {
		console.log('Connected mongodb success');
	})
	.catch((err) => console.log('Error connect'));

// dev
if (1 === 1) {
	mongoose.set('debug', true);
	mongoose.set('debug', { color: true });
}

module.exports = mongoose;
