const cashedData = {};
const { stringify: str, parse } = JSON;
export default function $CASH(funcName) {
	if (funcName === "flex") console.log(22);
	const args = Object.values(arguments).slice(1);
	const cash = cashedData[funcName];
	const possiblyResult = cash[str(args)];
	if (possiblyResult) return parse(possiblyResult);
	const result = functions[funcName](...args);
	cash[str(args)] = str(result);
	return result;
}

const functions = {
	flex(whatIDontWant) {
		const s = { display: "flex" };
		if (!whatIDontWant.includes("alignItems")) s.alignItems = "center";
		return /*<<PURE*/ !whatIDontWant.includes("justifyContent") ? { ...s, justifyContent: "center" } : s;
	},
	transition(time) {
		return /*<<PURE*/ {
			transition: `${time}s ease-in-out,background-color
                      ${time}s ease-in-out,border-color
                      ${time}s ease-in-out,box-shadow
                      ${time}s ease-in-out;`,
		};
	},
	test(a, b) {
		console.log("not cached!!");
		return /*<<PURE*/ a + b;
	},
};
(() => Object.keys(functions).map(func => (cashedData[func] = {})))();

// (function () { /*test*/
// 	if (!process.browser) return "pashmak";
// 	const args = [200002002000002000000000, 200002000000];
// 	for (let i = 0; i < 100; i++) {
// 		console.time();
// 		$CASH("test", ...args);
// 		console.timeEnd();
// 	}
// })();

// const cash = {};
// function sumArray(arr, num) {
// 	const { stringify: str, parse } = JSON;
// 	if (str(arguments) in cash) return parse(cash[str(arguments)]);

// 	console.log(arr, "not in cashed data. calculating it");

// 	var calculatedReturn = 0;
// 	for (const i of arr) calculatedReturn += i + num;

// 	cash[str(arguments)] = str(calculatedReturn);

// 	return calculatedReturn;
// }
