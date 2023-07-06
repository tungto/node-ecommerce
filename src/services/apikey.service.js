'use strict';

const apiKeyModel = require('../models/apiKey.model');
const crypto = require('crypto');

class ApiKeyService {
	static findById = async (key) => {
		// const randomKey = crypto.randomBytes(64).toString('hex');
		// console.log(randomKey);

		// const newKey = await apiKeyModel.create({
		// 	key: randomKey,
		// 	permissions: ['0000'],
		// });

		// console.log('newKey', newKey);

		const objKey = await apiKeyModel.findOne({ key, status: true }).lean();

		// console.log('object key:', objKey);

		return objKey;
	};
}

// const findById = async (key) => {
// 	const objKey = await apiKeyModel.findOne({ key, status: true }).lean();

// 	return objKey;
// };

// module.exports = {
// 	findById,
// };

module.exports = ApiKeyService;
