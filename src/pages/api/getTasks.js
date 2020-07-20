export default function (req, res) {
	const data = [];
	let i;
	for (i = 1; i < 15; i++) {
		const r = (Math.random() * 10).toFixed();
		const bool = r > 5;
		data.push({
			id: `${i}`,
			title: bool ? "دویدن" : "قهوه خوردن",
			when: bool ? "امروز" : "فردا",
			isDone: bool,
			isStared: bool,
			color: "#ccc",
			tags: ["a", "b"],
		});
	}
	res.status(200).json(data);
	res.end();
}
