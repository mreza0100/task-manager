import { getRandomNumber } from "../../helpers/exports";

export default function contactsAPI(req, res) {
	const result = [];
	for (let i = 0; i < 2000; i++) {
		const contact = {
			id: getRandomNumber(100, 100000000).toString(),
			name: i.toString(),
			mobile: "09361719100" + i,
		};
		result.push(contact);
	}
	res.status(200).json(result);
}
