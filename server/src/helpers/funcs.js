const { connection, Promise } = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports.getCollections = configs => {
	const detailes = configs.detailes || false;
	const collections = connection.db.listCollections();
	if (detailes) return collections;
	return new Promise((resolve, reject) => {
		collections.toArray((err, arr) => {
			if (err) return reject(err);
			return resolve(arr);
		});
	});
};

module.exports.getObjLength = obj => Object.keys(obj).length;

module.exports.hashThis = async password =>
	await bcrypt.hash(password, await bcrypt.genSalt(+process.env.salt));

module.exports.bcryptCompare = async (normalPass, hashedPass) =>
	await bcrypt.compare(normalPass, hashedPass);

module.exports.badReq = res =>
	res.status(400).send("some thing went wrong from badReq").end();
