export default async function (req, res) {
	res.status(404).json({ msg: "U lost" });
}
