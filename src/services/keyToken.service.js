'use strict';
const keyTokenModel = require('../models/keytoken.model');

class KeyTokenService {
	static createKeyToken = async ({ userId, publicKey }) => {
		try {
			// publicKey is buffer  format by origin. Need to convert to string before use
			const publicKeyString = publicKey.toString();
			const tokens = await keyTokenModel.create({
				user: userId,
				publicKey: publicKeyString,
			});

			return tokens ? tokens.publicKey : null;
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = KeyTokenService;
