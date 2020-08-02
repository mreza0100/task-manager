import create from "./elementFactory";

const wrapperStyles = ({ time, extraStyles = {}, top }) => ({
	minWidth: "200px",
	height: "auto",
	padding: "15px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-evenly",
	alignItems: "flex-start",
	borderRadius: "5px",
	position: "absolute",
	top,
	right: "-30%",
	animationName: "msg",
	animationDuration: time,
	animationIterationCount: 1,
	animationTimingFunction: "ease-in-out",
	animationFillMode: "forwards",
	animationDirection: "forward",
	animationDelay: 0,
	...extraStyles,
});

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
	{ time = 6, extraStyles = {}, mainAttrs, status, pendingID } = {},
	callback
) {
	if (!process.browser) return void 0;
	const top = inPlay * 70 + "px";
	inPlay++;
	if (pendingID) {
		if (pendingList.find(ID => ID === pendingID)) return void 0;
		else pendingList.push(pendingID);
	}

	var title, body;
	if (tText)
		title = create({
			nodeName: tNodeName ?? "h3",
			attrs: { class: "msg-title", ...tAttrs },
			text: tText,
			styles: tStyles,
			childs: tChilds,
			props: tProps,
		});
	if (bText)
		body = create({
			nodeName: bNodeName ?? "h6",
			attrs: { class: "msg-body", ...bAttrs },
			text: bText,
			styles: bStyles,
			childs: bChilds,
			props: bProps,
		});
	const msg = create({
		styles: wrapperStyles({ time: time + "s", extraStyles, top }),
		attrs: mainAttrs,
		childs: [title, body, ...(Array.isArray(html) ? html : [html])],
	});

	if (status !== "none") msg.classList.add(`bg-${status ?? "info"}`);
	document.body.appendChild(msg);
	setTimeout(() => {
		inPlay--;
		document.body.removeChild(msg);
		if (pendingID) pendingList = pendingList.filter(ID => ID !== pendingID);
		if (callback) callback();
	}, time * 1000);
}
