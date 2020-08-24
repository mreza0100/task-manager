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

/* 

import DatePicker from "../../node_modules/react-datepicker2/dist/es/index";
import { useState } from "react";

export default function Test() {
	const date = "2024-10-25 5:35:20";
	const [value, setValue] = useState(moment(date, "YYYY-M-D HH:mm:ss"));
	return (
		<div>
			<DatePicker isGregorian={false} value={value} onChange={val => setValue(val)} />
			<h1
				onClick={() => {
					console.log(value.format("YYYY-M-D HH:mm:ss"));
				}}
			>
				HIIIIIIII
			</h1>
		</div>
	);
}
*/

function parseDateFromServer(dateFromDB) {
	return moment(dateFromDB, "YYYY-M-D HH:mm:ss");
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
	setTimeout(func, 0);
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
};
