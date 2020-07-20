import Router from "next/router";

function transition(time = 0.3) {
	return {
		transition: `${time}s ease-in-out,background-color 
                ${time}s ease-in-out,border-color 
                ${time}s ease-in-out,box-shadow 
                ${time}s ease-in-out;`
	};
}

function flex(whatIDontWant = []) {
	let s = { display: "flex" };
	if (!whatIDontWant.includes("alignItems")) s = { ...s, alignItems: "center" };
	return !whatIDontWant.includes("justifyContent") ? (s = { ...s, justifyContent: "center" }) : s;
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
			opacity: "1"
		},
		"&:focus": {
			outline: "none",
			border: "1px #475993 solid",
			boxShadow: "3px 3px #475993a4"
		}
	}
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function prevEnter(e) {
	if ((e.charCode || e.keyCode) === 13) e.preventDefault();
}

function getCookie({ cookies, key = "token" }) {
	try {
		return cookies
			.split("; ")
			.find((row) => row.startsWith(key))
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

function changeDateFormat(date) {
	// changing "2020-06-21T19:30:00.000Z" to 2020-06-21 19:30:00
	return JSON.stringify(date).split("T").join(" ").slice(1, 20);
}

function editDate(initaialDate) {
	// changing 2020-06-21 19:30:00 to 2020-06-21 19:30:00.000Z
	return initaialDate + ".000Z";
}

function tagObjToArr(tags = []) {
	// changing [{name:"awd"}] to ['name']
	return tags.map((i) => i.name);
}

function tagArrToObj(tags = []) {
	// changing ['name'] to [{name:"awd"}]
	return tags.map((i) => ({ name: i }));
}

function reloadRouter() {
	if (process.browser) {
		const { pathname, search } = location;
		Router.replace(pathname + search);
	}
}

function serverRedirect({ res, route }) {
	if (route[0] !== "/") route = "/" + route;
	res.writeHead(302, { Location: route }).end();
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	// .then(
	// 	function () {
	// 		console.log("Async: Copying to clipboard was successful!");
	// 	},
	// 	function (err) {
	// 		console.error("Async: Could not copy text: ", err);
	// 	}
	// );
}

function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
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
	changeDateFormat,
	tagObjToArr,
	tagArrToObj,
	editDate,
	reloadRouter,
	serverRedirect,
	copyToClipboard,
	getRandomColor
};
