const { cashedData, functions } = (function init(functions, initialCash) {
	if (!new.target) return new init(functions, initialCash);
	this.cashedData = initialCash;
	this.functions = functions;
	Object.keys(this.functions).forEach(func => {
		if (!this.cashedData[func]) this.cashedData[func] = {};
	});
})(
	{
		/* <!><!><!><!><!><!><!><!> PURE FUNCTIONS <!><!><!><!><!><!><!><!>  */
		flex(whatIDontWant) {
			const s = { display: "flex", justifyContent: "center", alignItems: "center" };
			for (const i of whatIDontWant) delete s[i];
			return s;
		},
		transition(time) {
			return {
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
// ?-- INTERNAL
export default function $CASH(funcName, ...args) {
	const strArgs = str(args);
	const cashed = cashedData[funcName];

	return parse(cashed[strArgs] || (cashed[strArgs] = str(functions[funcName](...args))));
}

// !-- EXTERNAL
export function $USE_CASH(func, { getUtils } = {}) {
	let cache = {};

	return getUtils
		? [
				(...args) => parse(cache[str(args)] || (cache[str(args)] = str(func(...args)))),
				{
					resetCache: () => (cache = {}),
					getCache: () => cache,
					changeCache: getNewCache => (cache = getNewCache(cache)),
				},
		  ]
		: (...args) => parse(cache[str(args)] || (cache[str(args)] = str(func(...args))));
}

// ! external test
// (function () {
// 	const test = $USE_CASH((a, b) => {
// 		console.log("not cached!!");
// 		var x = [];
// 		for (let i = 0; i < 100; i++) x.push(a ** b);

// 		return x;
// 	});

// 	for (let i = 0; i < 10; i++) {
// 		console.time();
// 		test(10, 10);
// 		console.timeEnd();
// 	}
// })();

// ! external test with getUtils
// (function () {
// 	if (!process.browser) return void 0;
// 	const [test, { deleteCache, getCache, changeCache }] = $USE_CASH(
// 		(a, b) => {
// 			console.log("not cached!!");
// 			var x = [];
// 			for (let i = 0; i < 100; i++) x.push(a ** b);

// 			return x;
// 		},
// 		{ getUtils: true }
// 	);

// 	for (let i = 0; i < 10; i++) {
// 		changeCache(prev => {
// 			const newCache = { ...prev };
// 			newCache["x" + i] = ["1000" + 1];
// 			return newCache;
// 		});
// 		console.log(getCache());
// 		console.time();
// 		test(10, 10);
// 		console.timeEnd();
// 	}
// 	deleteCache();
// 	console.log(getCache());
// })();

// ! internal test
// (function () {
// 	if (!process.browser) return void 0;
// 	const args = [100, 100];
// 	for (let i = 0; i < 10; i++) {
// 		console.time();
// 		$CASH("test", ...args);
// 		console.timeEnd();
// 	}
// })();

// ! perototype of cash func
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
