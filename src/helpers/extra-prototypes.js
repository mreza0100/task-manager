(prototypeData => {
	console.log("in initing");
	prototypeData.forEach(({ target, options, key, value }) => {
		Object.defineProperty(target, key, {
			...options,
			value,
		});
	});
})([
	{
		key: "keys",
		target: Object.prototype,
		options: { writable: true },
		value: function () {
			return Object.keys(this);
		},
	},
	{
		key: "values",
		target: Object.prototype,
		options: { writable: true },
		value: function () {
			return Object.values(this);
		},
	},
	{
		key: "clear",
		target: Object.prototype,
		options: { writable: true },
		value: function () {
			for (const i in this) delete this[i];
			return this;
		},
	},
	{
		key: "map",
		target: Object.prototype,
		options: { writable: true },
		value: function (forEach) {
			const _this = { ...this };
			const len = Object.keys(_this).length;
			for (const i in _this) _this[i] = forEach(i, _this[i], len, _this);
			return _this;
		},
	},
	{
		key: "forEach",
		target: Object.prototype,
		options: { writable: true },
		value: function (forEach) {
			const _this = { ...this };
			for (const i in _this) forEach(i, _this[i]);
		},
	},
	{
		key: "clone",
		target: Object.prototype,
		options: { writable: true },
		value: function () {
			return { ...this };
		},
	},
	{
		key: "isEmpty",
		target: Object.prototype,
		options: { writable: true },
		value: function () {
			for (const _ in this) return false;
			return true;
		},
	},
	{
		key: "isEqual",
		target: Object.prototype,
		options: { writable: true },
		value: function (otherObj) {
			return JSON.stringify(this) === JSON.stringify(otherObj);
		},
	},
	{
		key: "isEmpty",
		target: Array.prototype,
		options: { writable: true },
		value: function () {
			for (const _ in this) return false;
			return true;
		},
	},
	{
		key: "isEqual",
		target: Array.prototype,
		options: { writable: true },
		value: function (otherArray) {
			return JSON.stringify(this) === JSON.stringify(otherArray);
		},
	},
]);
