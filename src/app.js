const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

console.log('hello');

// init middleware
app.use(morgan('dev')); // compile, common, short, tiny
app.use(helmet());
app.use(compression());

// init db

// init router

// handle error

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			message: 'hello',
		},
	});
});

module.exports = app;
