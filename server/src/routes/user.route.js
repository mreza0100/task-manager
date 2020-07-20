const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../helpers/validation");

const { hashThis, bcryptCompare } = require("../helpers/funcs");

const router = require("express").Router();

router.post("/register", async (req, res) => {
	// validation
	const isValid = await registerValidation({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	if (!isValid.ok) return res.status(403).json(isValid.err).end();
	const { name, email, password } = isValid.trustedData;
	// validation is ok check for email duplication
	const isduplicate = await User.findOne({ email }).then(res => !!res);
	if (isduplicate) return res.status(406).send("email already exist").end();

	// all right create new user
	const hashedPassword = await hashThis(password);
	const newUser = new User({
		name,
		email,
		password: hashedPassword,
	});
	try {
		const savedUser = await newUser.save();
		res.status(201).json({ id: savedUser._id }).end();
	} catch (err) {
		res.status(400).send(err).end();
	}
});

router.post("/login", async (req, res) => {
	// validation
	const isValid = await loginValidation({
		email: req.body.email,
		password: req.body.password,
	});
	if (!isValid.ok) return res.status(403).json(isValid.err).end();
	const { email, password } = isValid.trustedData;
	// validation is ok check for email exist and password compare
	const user = await User.findOne({ email });

	if (!user) return res.status(400).send("email not exist").end();
	const isValidPass = await bcryptCompare(password, user.password);
	if (!isValidPass) return res.status(400).send("password is wrong").end();
	// all right generating JWT
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
		expiresIn: "24d",
	});
	res.status(200).json({ token }).end();
});

module.exports = router;
