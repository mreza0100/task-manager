const User = require("../models/user.model");

const { saveTodoValidation } = require("../helpers/validation");
const authentication = require("../helpers/authentication");
const { badReq } = require("../helpers/funcs");

const router = require("express").Router();
router.get("/", authentication, async (req, res) => {
	try {
		const user = await User.findById(req.userID);
		if (!user) return res.status(401).send("Access Denied");
		res.json(user.todos).end();
	} catch (err) {
		console.log(err);
		return badReq(res);
	}
});

router.post("/", authentication, async (req, res) => {
	// validation
	const isValid = await saveTodoValidation({
		title: req.body.title,
		body: req.body.body,
	});
	if (!isValid.ok) return res.status(403).json(isValid.err).end();

	const { title, body } = isValid.trustedData;
	// validation is ok try to save todo
	try {
		const user = await User.findById(req.userID);
		if (!user) return res.status(401).send("Access Denied");
		user.todos.unshift({ title, body });
		user.save();
		res.status(201).send("todo added").end();
	} catch (err) {
		return badReq(res);
	}
});

router.delete("/", authentication, async (req, res) => {
	const userID = req.userID;
	const todoID = req.body.todoID;

	try {
		const user = await User.findById(userID);
		if (!user) return res.status(401).send("Access Denied");

		if (user.todos)
			user.todos = user.todos.filter(todo => todo._id.toString() !== todoID);

		user.save();

		res.status(200).send("todo deleted").end();
	} catch (err) {
		return badReq(res);
	}
});

module.exports = router;
