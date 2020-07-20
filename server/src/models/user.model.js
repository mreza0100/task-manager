const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: false,
			required: true,
			minlength: 6,
			maxlength: 255,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			minlength: 6,
			maxlength: 255,
			trim: true,
		},
		password: {
			type: String,
			unique: false,
			required: true,
			minlength: 8,
			maxlength: 1024,
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema, "Users");
