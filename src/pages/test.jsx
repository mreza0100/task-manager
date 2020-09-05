function makeMap(str, { expectsLowerCase }) {
	const map = str.split(",");

	return expectsLowerCase ? val => map.includes(val.toLowerCase()) : val => map.includes(val);
}

function makeMap(str, expectsLowerCase) {
	var map = {};
	var list = str.split(",");
	// ["a", "b"]

	for (var i = 0; i < list.length; i++) map[list[i]] = true;
	// { a: true, b: true }

	return expectsLowerCase
		? function (val) {
				return map[val.toLowerCase()];
		  }
		: function (val) {
				return map[val];
		  };
}
