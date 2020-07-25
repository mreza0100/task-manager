export default async function Lost(req, res) {
	res.status(404).json({ msg: "U lost" });
}
