const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const SECOND = 5000;
const app = express();

console.log('hello');

// init middleware
app.use(morgan('dev')); // compile, common, short, tiny
app.use(helmet());
app.use(compression());

// init db
// require('./dbs/init.mongodb.lv0');
require('./dbs/init.mongodb');

const { countConnect, checkOverload } = require('./helpers/check.connect');

countConnect();
const interval = setInterval(checkOverload, SECOND);

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

module.exports = {
	app,
	interval,
};
