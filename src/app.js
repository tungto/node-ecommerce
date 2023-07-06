const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const SECOND = 5000;
const app = express();
const routes = require('./routes');

// init middleware
app.use(morgan('dev')); // compile, common, short, tiny
app.use(helmet());
app.use(compression());
// parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
// require('./dbs/init.mongodb.lv0');
require('./dbs/init.mongodb');

const { countConnect, checkOverload } = require('./helpers/check.connect');

countConnect();
// const interval = setInterval(checkOverload, SECOND);

// init router
app.use('/', require('./routes'));

// handle error

module.exports = {
	app,
	// interval,
};
