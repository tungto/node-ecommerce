'use strict';

const { mongoose, Schema } = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxLength: 150,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
		verify: {
			type: Schema.Types.Boolean,
			default: false,
		},
		roles: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

const saltRounds = 10;

shopSchema.pre('save', async function (next) {
	const hashPW = await bcrypt.hash(this.password, saltRounds);
	this.password = hashPW;
});
//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);
