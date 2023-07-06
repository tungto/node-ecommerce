'use strict';

const ApiKeyService = require('../services/apikey.service');

const HEADER = {
	API_KEY: 'x-api-key',
	AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
	try {
		const key = req.headers[HEADER.API_KEY]?.toString();
		console.log('object', req.headers[HEADER.API_KEY]);
		if (!key) {
			return res.status(403).json({
				status: 'failed',
				message: 'Forbidden Error',
			});
		}
		const objKey = await ApiKeyService.findById(key);

		if (!objKey) {
			return res.status(403).json({
				status: 'failed',
				message: 'Forbidden Error',
			});
		}

		req.objKey = objKey;
		return next();
	} catch (error) {
		console.log('ERROR: ', error);
	}
};

const checkPermissions = (permissions) => {
	return (req, res, next) => {
		console.log('check permissions:', req.objKey.permissions);

		if (!req.objKey.permissions) {
			return res.status(403).json({
				status: 'failed',
				message: 'Permission denied',
			});
		}

		console.log('permissions::', req.objKey.permissions);
		const validPermission = req.objKey.permissions.includes(permissions);

		console.log('validPermission', validPermission);

		if (!validPermission) {
			return res.status(403).json({
				status: 'failed',
				message: 'Permission denied',
			});
		}

		return next();
	};
};

module.exports = {
	apiKey,
	checkPermissions,
};
