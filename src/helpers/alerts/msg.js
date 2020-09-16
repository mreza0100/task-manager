import { flex } from "../exports";
import create from "./elementFactory";

const wrapperStyles = ({ time, mainColor, top, extraStyles = {} }) => ({
	...flex(["justifyContent"]),
	justifyContent: "flex-start",
	minWidth: "300px",
	height: "auto",
	padding: "15px",
	margin: 0,
	fontSize: "12px",
	color: "#54698D",
	position: "fixed",
	top,
	right: "-20%",
	animationName: "msg",
	animationDuration: time,
	animationIterationCount: 1,
	animationTimingFunction: "ease-in-out",
	animationFillMode: "forwards",
	animationDirection: "forward",
	animationDelay: 0,
	transition: "all 4s",
	userSelect: "none",
	boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
	borderRadius: "4px 4px 3px 3px",
	backgroundColor: "#FFF",
	borderBottom: `2px solid ${mainColor}`,
	...extraStyles,
});

const statusIconStyles = ({ mainColor }) => ({
	...flex(),
	width: "25px",
	height: "25px",
	color: "#FFF",
	marginLeft: "15px",
	backgroundColor: mainColor,
	borderRadius: "100%",
});

const closeIconStyles = {
	width: "15px",
	height: "15px",
	color: "#DADADA",
	padding: "5px",
	marginRight: "auto",
	cursor: "pointer",
};

var pendingList = [];
var inPlay = 0;

export default function showMsg(
	{
		title: {
			text: tText,
			attrs: tAttrs,
			styles: tStyles,
			childs: tChilds,
			nodeName: tNodeName,
			props: tProps,
		} = {},
		body: {
			text: bText,
			attrs: bAttrs,
			styles: bStyles,
			childs: bChilds,
			nodeName: bNodeName,
			props: bProps,
		} = {},
		html,
	} = {},
	{ time = 6, extraStyles = {}, mainAttrs, status = "info", pendingID = false } = {},
	callback
) {
	if (!process.browser) return;
	const top = inPlay * 70 + 2 + "px";
	if (pendingID) {
		if (pendingList.find(ID => ID === pendingID)) return;
		pendingList.push(pendingID);
	}
	inPlay++;

	const mainColor =
		status === "success" ? "#2CDA9B" : status === "danger" ? "#FF6672" : "warning" ? "#FFD100" : "";

	var title, body, closeIcon, statusIcon;
	if (tText) {
		title = create({
			nodeName: tNodeName ?? "h3",
			attrs: { class: "msg-title", ...tAttrs },
			text: tText,
			styles: { ...tStyles, ...{ margin: 0 } },
			childs: tChilds,
			props: tProps,
		});
	}
	if (bText) {
		body = create({
			nodeName: bNodeName ?? "h6",
			attrs: { class: "msg-body", ...bAttrs },
			text: bText,
			styles: bStyles,
			childs: bChilds,
			props: bProps,
		});
	}

	statusIcon = create({
		nodeName: "i",
		props: { className: "fa fa-check" },
		styles: statusIconStyles({ mainColor }),
	});

	closeIcon = create({
		nodeName: "i",
		props: { className: "fa fa-times" },
		events: { click: deleteMsg },
		styles: closeIconStyles,
	});

	const __MSG__ = create({
		styles: wrapperStyles({ time: time + "s", top, mainColor, extraStyles }),
		attrs: mainAttrs,
		childs: [statusIcon, title, body, closeIcon, ...(Array.isArray(html) ? html : [html])],
	});

	document.body.appendChild(__MSG__);
	var valTimeout = setTimeout(deleteMsg, time * 1000);
	const closeOnEscape = e => {
		if (e.key === "Escape") deleteMsg(true);
	};
	window.addEventListener("keydown", closeOnEscape);

	function deleteMsg(e) {
		inPlay--;
		window.removeEventListener("keydown", closeOnEscape);
		if (pendingID) pendingList = pendingList.filter(ID => ID !== pendingID);
		if (callback) callback();
		if (e) {
			// if e was true it mean he clicked on closeIcon of press Escape
			// so timeout most stop and remove it in other way
			clearTimeout(valTimeout);
			__MSG__.style.animationName = "msg-close";
			__MSG__.style.animationDuration = time / 4 + "s";
			setTimeout(() => {
				document.body.removeChild(__MSG__);
			}, time * 300);
		} else {
			document.body.removeChild(__MSG__);
		}
	}
}
