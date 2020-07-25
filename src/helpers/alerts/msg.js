import create from "./elementFactory";

const wrapperStyles = ({ time, extraStyles = {} }) => ({
	minWidth: "300px",
	height: "auto",
	padding: "25px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-evenly",
	alignItems: "flex-start",
	borderRadius: "5px",
	position: "absolute",
	top: "20px",
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

export function showMsg(
	// TODO: support multi msgs
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
	{ time = 6, extraStyles = {}, mainAttrs, status } = {},
	callback,
) {
	if (!process.browser) return void 0;
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
	window.x = title.cloneNode(true);
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
		styles: wrapperStyles({ time: time + "s", extraStyles }),
		attrs: mainAttrs,
		childs: [title, body, ...(Array.isArray(html) ? html : [html])],
	});

	if (status !== "none") msg.classList.add(`bg-${status ?? "info"}`);
	document.body.appendChild(msg);
	setTimeout(() => {
		document.body.removeChild(msg);
		if (callback) callback();
	}, time * 1000);
}
