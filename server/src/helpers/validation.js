const yup = require("yup");

const registerSchema = yup.object({
	name: yup.string().min(6).max(255).required().trim(),
	email: yup.string().min(6).max(255).email().required().trim(),
	password: yup.string().min(6).max(1024).required().trim(),
});

module.exports.registerValidation = data =>
	registerSchema
		.validate(data)
		.then(trustedData => ({ ok: true, trustedData }))
		.catch(err => ({ ok: false, err }));

const loginSchema = yup.object({
	email: yup.string().min(6).max(255).email().required().trim(),
	password: yup.string().min(6).max(1024).required().trim(),
});
module.exports.loginValidation = data =>
	loginSchema
		.validate(data)
		.then(trustedData => ({ ok: true, trustedData }))
		.catch(err => ({ ok: false, err }));

const saveTaskSchema = yup.object({
	title: yup.string().required().trim(),
	description: yup.string().trim(),
	color: yup.string().trim(),
	fromDate: yup.string().trim(),
	toDate: yup.string().trim(),
	tags: yup.array(),
});
module.exports.saveTaskValidation = data =>
	saveTaskSchema
		.validate(data)
		.then(trustedData => ({ ok: true, trustedData }))
		.catch(err => ({ ok: false, err }));
