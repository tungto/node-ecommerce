'use strict';

const mongoose = require('mongoose');

const connectString = `mongodb://localhost:27017/shopDEV`;

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
		mongoose
			.connect(connectString)
			.then(() => {
				console.log('Connected Mongodb Success - Lvx');
			})
			.catch((err) => {
				console.log('Error connect!');
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

module.exports = instanceMongodb;
