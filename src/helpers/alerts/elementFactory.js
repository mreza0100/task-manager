export default function create({
	nodeName = "div",
	styles = {},
	attrs = {},
	childs = [],
	props = {},
	text = "",
} = {}) {
	if (!process.browser) return void 0;
	childs = Array.isArray(childs) ? childs : [childs];
	let style, attr, child, node;
	node = document.createElement(nodeName);
	node.innerText = text;
	for (style in styles) if (style) node.style[style] = styles[style];
	for (attr in attrs) if (attr) node.setAttribute(attr, attrs[attr]);
	for (const prop in props) node[prop] = props[prop];
	for (child of childs) {
		if (!child) continue;
		if (typeof child === "object") node.appendChild(child);
		else node.insertAdjacentHTML("beforeend", child);
	}
	return node;
}
