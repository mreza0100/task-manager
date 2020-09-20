export default function create({
	nodeName = "div",
	styles = {},
	props = {},
	attrs = {},
	childs = [],
	events = {},
	text = "",
} = {}) {
	if (!process.browser) return;
	childs = Array.isArray(childs) ? childs : [childs];
	let style, attr, child, prop, e;
	const node = document.createElement(nodeName);

	if (text) node.appendChild(document.createTextNode(text));

	for (style in styles) if (style) node.style[style] = styles[style];
	for (attr in attrs) if (attr) node.setAttribute(attr, attrs[attr]);
	for (prop in props) node[prop] = props[prop];
	for (e in events) if (e && events[e]) node.addEventListener(e, events[e]);
	for (child of childs) {
		if (!child) continue;
		if (typeof child === "object") node.appendChild(child);
		else node.insertAdjacentHTML("beforeend", child);
	}
	return node;
}
