'use strict';

const ShopModel = require('../models/shop.model');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');

const RoleShop = {
	SHOP: 'SHOP',
	WRITER: 'WRITER',
	EDITOR: 'EDITOR',
	ADMIN: 'ADMIN',
};

class AccessService {
	static signUp = async ({ name, email, password }) => {
		try {
			a;
			// 1 - check if email already existed
			/**
			 * using .lean() to query faster
			 * https://mongoosejs.com/docs/tutorials/lean.html
			 */
			const shop = await ShopModel.findOne({ email }).lean();

			console.log('EXISTED SHOP:', shop);

			if (shop) {
				return {
					code: 'xxx',
					message: 'Email already exists',
				};
			}

			const newShop = await ShopModel.create({
				name,
				email,
				password,
				roles: [RoleShop.SHOP],
			});

			if (newShop) {
				// create privateKey, publicKey
				const { publicKey, privateKey } = crypto.generateKeyPairSync(
					'rsa',
					{
						modulusLength: 4096,
						privateKeyEncoding: {
							type: 'pkcs1',
							format: 'pem',
						},
						publicKeyEncoding: {
							type: 'pkcs1',
							format: 'pem',
						},
					}
				);

				// save public key to database
				const publicKeyString = await KeyTokenService.createKeyToken({
					userId: newShop._id,
					publicKey,
				});

				if (!publicKeyString) {
					return {
						code: 'xxx',
						message: 'publicKeyString error',
					};
				}

				const publicKeyObject = crypto.createPublicKey(publicKeyString);
				console.log('publicKeyObject', publicKeyObject);

				const tokens = await createTokenPair(
					{
						userId: newShop._id,
						email: newShop.email,
					},
					publicKey,
					privateKey
				);

				console.log('TOKENS: ', tokens);

				return {
					status: 'success',
					data: {
						shop: newShop,
						tokens,
					},
				};
			}

			return {
				status: 'success',
				data: null,
			};
		} catch (error) {
			return {
				code: 'xxx',
				message: error.message,
				status: 'error',
			};
		}
	};
}

module.exports = AccessService;
