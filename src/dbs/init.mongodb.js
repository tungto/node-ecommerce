'use strict';

const mongoose = require('mongoose');
const config = require('../configs/config.mongodb');

//"mongodb://localhost:27017/shopDEV"
const connectString = `mongodb://0.0.0.0:${config.db.port}/${config.db.name}`;

// using singleton pattern to create only one connection
class Database {
	constructor() {
		this.connect();
	}
	//connect
	connect(type = 'mongodb') {
		if (1 === 1) {
			mongoose.set('debug', true);
			mongoose.set('debug', { color: true });
		}

		console.log(connectString);
		mongoose
			.connect(connectString)
			.then(() => {
				console.log(`Connected Mongodb ${connectString} Success - Lvx`);
			})
			.catch((err) => {
				console.log('Error connect!', err);
			});
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();

console.log(mongoose.connection.readyState);

module.exports = instanceMongodb;
