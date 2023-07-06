const Shop = require('../models/shop.model');
const AccessService = require('../services/access.service');

class AccessController {
	signUp = async (req, res, next) => {
		try {
			console.log(`[P]:::signUP:::`, req.body);

			const signUpRes = await AccessService.signUp(req.body);

			return res.status(201).json(signUpRes);
		} catch (error) {
			console.log('ERROR', error);
			next(error);
		}
	};
}

module.exports = new AccessController();
