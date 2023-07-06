'use strict';
const jwt = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
	//pubicKey to verify
	console.log('CREATE TOKEN PAIR');
	try {
		console.log('PRIVATE KEY:', privateKey);
		// accessToken
		const accessToken = await jwt.sign(payload, privateKey, {
			algorithm: 'RS256',
			expiresIn: '2 days',
		});

		const refreshToken = await jwt.sign(payload, privateKey, {
			algorithm: 'RS256',
			expiresIn: '7 days',
		});

		jwt.verify(accessToken, publicKey, (err, decoded) => {
			if (err) {
				console.log(`error verify`, err);
			} else {
				console.log(`decoded verify`, decoded);
			}
		});

		return { accessToken, refreshToken };
	} catch (error) {
		console.log('ERROR CREATE TOKEN PAIR', error);
	}
};

module.exports = {
	createTokenPair,
};
