import moment from "moment-jalaali";
import Router from "next/router";
import $CACH from "./cash";

function transition(time = 0.3) {
	return $CACH("transition", time);
}

function flex(whatIDontWant = []) {
	return $CACH("flex", whatIDontWant);
}

const $ = "!important";

const butyInputs = {
	"input, textarea": {
		borderRadius: "5px",
		padding: "5px 8px",
		margin: "10px 0",
		border: "1px #3c615ba1 solid",
		transition: "all .2s linear",
		"&::placeholder": {
			color: "black",
			opacity: "1",
		},
		"&:focus": {
			outline: "none",
			border: "1px #475993 solid",
			boxShadow: "3px 3px #475993a4",
		},
	},
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function prevEnter(e) {
	if ((e.charCode || e.keyCode) === 13 && e.target.nodeName !== "TEXTAREA") e.preventDefault();
}

function getCookie({ cookies, key = "token" }) {
	try {
		return cookies
			.split("; ")
			.find(row => row.startsWith(key))
			.split("=")[1];
	} catch (err) {
		return false;
	}
}

function setCookie({ key, value, days = 2 }) {
	var date = new Date();
	date.setTime(+date + days * 86400000);

	document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
	// !and for server side
	// import { serialize } from 'cookie';

	// function (req, res) {
	//    res.setHeader('Set-Cookie', serialize('token', 'token_cookie_value', { path: '/' }));
	// }
}

function deleteCookie(name) {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function invertHex(hex) {
	return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
}

function parseDateFromServer(dateFromDB) {
	return moment(dateFromDB, "YYYY-MM-DD HH:mm:ss");
}

function stringfyDateForServer(dateForDB) {
	return dateForDB.format("YYYY-M-D HH:mm:ss");
}

function tagObjToArr(tags = []) {
	// changing [{name:"awd"}] to ['name']
	return tags.map(i => i.name);
}

function tagArrToObj(tags = []) {
	// changing ['name'] to [{ name:"awd" }]
	return tags.map(i => ({ name: i }));
}

function reloadRouter() {
	if (process.browser) {
		const { pathname, search } = location;
		Router.replace(pathname + search);
	}
}

function serverRedirect({ res, route }) {
	if (process.browser) return "only in server side";
	if (route[0] !== "/") route = "/" + route;
	res.writeHead(302, { Location: route }).end();
}
function copyToClipboard(text) {
	try {
		navigator.clipboard.writeText(text);
		return true;
	} catch (err1) {
		try {
			const input = document.createElement("textarea");
			input.innerHTML = text;
			document.body.appendChild(input);
			input.select();
			const result = document.execCommand("copy");
			document.body.removeChild(input);
			return result;
		} catch (err2) {
			console.dir(err2);
			return false;
		}
	}
}

function getRandomColor(type = "hex") {
	if (type === "hex") return "#" + Math.floor(Math.random() * 16777215).toString(16);
	if (type === "rgb") {
		const num = Math.round(0xffffff * Math.random());
		return `rgb(${num >> 16}, ${(num >> 8) & 255}, ${num & 255})`;
	}
}

function isUndefined(thing) {
	return typeof thing === "undefined";
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function defer(func) {
	return setTimeout(func, 0);
}

function isEmptyObjOrArr(obj_arr) {
	for (const _ in obj_arr) return false;
	return true;
}

function trimObj(obj, { removeNull = true, removeEmptyArr = false, removeAnyFalse = false } = {}) {
	const _obj = { ...obj };
	for (const key in _obj) {
		if (removeNull && _obj[key] === null) delete _obj[key];
		if (removeEmptyArr && Array.isArray(_obj[key])) if (isEmptyObjOrArr) delete _obj[key];
		if (removeAnyFalse && !_obj[key]) delete _obj[key];
	}
	return _obj;
}

function mapObject(obj, forEach) {
	const _obj = { ...obj };
	const len = Object.keys(_obj).length;
	for (const i in _obj) _obj[i] = forEach(i, _obj[i], len, _obj);
	return _obj;
}

function toRawType(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

function isObject(obj) {
	return obj !== null && typeof obj === "object";
}

function looseEqual(a, b) {
	if (a === b) return true;

	var isObjectA = isObject(a);
	var isObjectB = isObject(b);
	if (isObjectA && isObjectB) {
		try {
			var isArrayA = Array.isArray(a);
			var isArrayB = Array.isArray(b);
			if (isArrayA && isArrayB) {
				return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]));
			} else if (a instanceof Date && b instanceof Date) {
				return a.getTime() === b.getTime();
			} else if (!isArrayA && !isArrayB) {
				var keysA = Object.keys(a);
				var keysB = Object.keys(b);
				return keysA.length === keysB.length && keysA.every(key => looseEqual(a[key], b[key]));
			} else return /*istanbul ignore next*/ false;
		} catch (e) {
			/* istanbul ignore next */
			return false;
		}
	} else if (!isObjectA && !isObjectB) return String(a) === String(b);
	else return false;
}

export {
	$,
	flex,
	transition,
	phoneRegExp,
	butyInputs,
	prevEnter,
	getCookie,
	setCookie,
	deleteCookie,
	invertHex,
	tagObjToArr,
	tagArrToObj,
	reloadRouter,
	serverRedirect,
	copyToClipboard,
	getRandomColor,
	isUndefined,
	getRandomNumber,
	defer,
	stringfyDateForServer,
	parseDateFromServer,
	isEmptyObjOrArr,
	trimObj,
	mapObject,
	toRawType,
	isObject,
	looseEqual,
};
