const Task = require("../models/task.model");

const { saveTaskValidation } = require("../helpers/validation");
const authentication = require("../helpers/authentication");
const { badReq } = require("../helpers/funcs");

const router = require("express").Router();

router.get("/get-all", authentication, async (req, res) => {
	try {
		const tasks = await Task.find({ userID: req.userID });
		res.json(tasks).end();
	} catch (err) {
		console.log(err);
		return badReq(res);
	}
});

router.get("/get-limited", authentication, async (req, res) => {
	var { limit } = req.query;
	limit = +limit;
	if (!limit || typeof limit != "number") return badReq(res);
	try {
		const tasks = await Task.find({ userID: req.userID }).limit(limit);
		res.json(tasks).end();
	} catch (err) {
		console.dir(err);
		return badReq(res);
	}
});

router.get("/get-one", authentication, async (req, res) => {
	var { taskID } = req.query;
	if (!taskID) return badReq(res);
	try {
		const task = await Task.findOne({ userID: req.userID, _id: taskID });
		res.json(task).end();
	} catch (err) {
		console.dir(err);
		return badReq(res);
	}
});

router.post("/", authentication, async (req, res) => {
	// validation
	const isValid = await saveTaskValidation({
		title: req.body.title,
		description: req.body.description,
		color: req.body.color,
		fromDate: req.body.fromDate,
		toDate: req.body.toDate,
		tags: req.body.tags,
	});
	if (!isValid.ok) return res.status(403).json(isValid.err).end();

	// validation is ok try to save task
	try {
		const task = new Task({ ...isValid.trustedData, userID: req.userID });
		const savadeTask = await task.save();

		res
			.status(201)
			.json({ msg: "task created successfully", id: savadeTask._id })
			.end();
	} catch (err) {
		console.dir(err);
		return badReq(res);
	}
});

router.delete("/", authentication, async (req, res) => {
	const userID = req.userID;
	const taskID = req.body.taskID;
	if (!taskID) return badReq(res);
	try {
		const result = await Task.findOneAndDelete({ _id: taskID, userID });
		if (!result) return res.status(202).send("No content").end();
		return res.status(200).send("Task Deleted").end();
	} catch (err) {
		console.dir(err);
		return badReq(res);
	}
});

router.put("/", authentication, async (req, res) => {
	// validation
	const isValid = await saveTaskValidation({
		title: req.body.title,
		description: req.body.description,
		color: req.body.color,
		fromDate: req.body.fromDate,
		toDate: req.body.toDate,
		tags: req.body.tags,
	});
	if (!isValid.ok) return res.status(403).json(isValid.err).end();
	const { taskID } = req.body;
	// validation is ok try to save task
	try {
		const task = await Task.findOneAndUpdate(
			{ _id: taskID, userID: req.userID },
			{ $set: isValid.trustedData }
		);
		res.status(200).json({ msg: "Task Updated Successfully", id: task._id }).end();
	} catch (err) {
		console.dir(err);
		return badReq(res);
	}
});

router.get("/test", async (req, res) => {
	try {
		const x = await Task.find({ tags: { $search: "e" } });
		console.dir(x);
	} catch (err) {
		console.dir(err);
	}
	res.status(200).end();
});
// ! '.*' + search.toLowerCase() + '.*'

module.exports = router;

/* 
{
    "title": "titeleeeeeeeeee",
    "description": "some description",
    "color": "#fff",
    "fromDate": "date",
    "toDate": "date2",
    "tags": [{"name": "tag name"}]
}
 */
