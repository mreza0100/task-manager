const { cashedData, functions } = (function init(functions, initialCash) {
	if (!new.target) return new init(functions, initialCash);
	this.cashedData = initialCash;
	this.functions = functions;
	Object.keys(this.functions).forEach(func => {
		this.cashedData[func] = {};
	});
})(
	{
		flex(whatIDontWant) {
			const s = { display: "flex" };
			if (!whatIDontWant.includes("alignItems")) s.alignItems = "center";
			return /*<<PURE*/ !whatIDontWant.includes("justifyContent")
				? { ...s, justifyContent: "center" }
				: s;
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
			var x = [];
			for (let i = 0; i < 100; i++) x.push(a ** b);

			console.log(x);
			return x;
		},
	},
	{}
);
const { stringify: str, parse } = JSON;
export default function $CASH(funcName, ...args) {
	const cash = cashedData[funcName];
	// get cashed data for that function
	const possiblyResult = cash[str(args)] || false;
	// maybe its secend time(or more) for a argumen i wanna get that
	if (possiblyResult) return parse(possiblyResult);
	// its not cashed im calling that function with uncashed arguments then cash result and return it
	const result = functions[funcName](...args);
	cash[str(args)] = str(result);
	return result;
}

// (function () {
// 	/*test*/
// 	if (!process.browser) return void 0;
// 	const args = [100, 100];
// 	for (let i = 0; i < 10; i++) {
// 		console.time();
// 		$CASH("test", ...args);
// 		console.timeEnd();
// 	}
// })();

// const cash = {};
// function sumArray(arr) {
// 	const { stringify: str, parse } = JSON;
// 	if (cash[str(arr)]) return parse(cash[str(arr)]);
// 	console.log(arr, "not in cashed data. calculating it");

// 	var result = 0;
// 	for (const i of arr) result += i;

// 	cash[str(arr)] = str(result);

// 	return result;
// }
