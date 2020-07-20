const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
	const token = req.headers.authentication;

	if (!token) return res.status(401).send("Access Denied");

	try {
		const JWTPayload = jwt.verify(token, process.env.TOKEN_SECRET);
		req.userID = JWTPayload._id;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).send("Invalid Token");
	}
}
module.exports = authentication;
