'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');

// count connection
const countConnect = () => {
	const numConnections = mongoose.connections.length;

	console.log(`Number of connections: ${numConnections}`);
};

// check overload
const checkOverload = () => {
	const numConnections = mongoose.connections.length;
	const numCores = os.cpus().length;
	const memoryUsage = process.memoryUsage().rss;
	//Example  maximum number of connections base on number of cores
	const maxConnections = numCores * 5;

	console.log(`Memory usage: ${memoryUsage / 1024 / 1024} Mb`);

	if (numConnections > maxConnections) {
		console.log(`Connection overload detected`);
	}
}; // monitor every 5 seconds

module.exports = {
	countConnect,
	checkOverload,
};
