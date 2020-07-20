const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		userID: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			unique: false,
			minlength: 1,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			unique: false,
			minlength: 1,
			trim: true,
		},
		color: {
			type: String,
			unique: false,
			minlength: null,
			trim: true,
		},
		fromDate: {
			type: String,
			unique: false,
			minlength: 1,
			trim: true,
		},
		toDate: {
			type: String,
			unique: false,
			minlength: 1,
			trim: true,
		},
		tags: [String],
		isDone: {
			type: Boolean,
			default: false,
		},
		isFavorite: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema, "Tasks");
