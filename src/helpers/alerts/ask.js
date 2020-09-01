import create from "./elementFactory";
import { flex, defer } from "../exports";

const wrapperStyles = ({ extraStyles }) => {
	var width = window.innerWidth < 500 ? "90%" : "40%";
	return {
		width,
		minHeight: "30vh",
		// minHeight: "120px",
		padding: "10px 0 10px 0",
		opacity: 0,
		position: "absolute",
		top: "25%",
		left: "50%",
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: "5px",
		transform: "translate(-50%, 0)",
		transition: "all 0.5s",
		...extraStyles,
	};
};

const btnWrapperStyles = {
	...flex(["justifyContent"]),
	justifyContent: "space-evenly",
	width: "50%",
};

const innerStyles = {
	...flex(["justifyContent"]),
	justifyContent: "space-evenly",
	flexDirection: "column",
	width: "100%",
	height: "100%",
	position: "relative",
};

const closeStyles = {
	position: "absolute",
	right: "15px",
	top: "10px",
	// padding: "8px",
	cursor: "pointer",
};

var isBusy;

export default function ask(
	{
		title: {
			text: tText,
			attrs: tAttrs,
			styles: tStyles,
			childs: tChilds,
			nodeName: tNodeName,
			props: tProps,
		},
		btn1: {
			text: b1Text,
			attrs: b1attrs,
			styles: b1Styles,
			childs: b1Cilds,
			props: b1Props,
		} = {},
		btn2: {
			text: b2Text,
			attrs: b2attrs,
			styles: b2Styles,
			childs: b2Cilds,
			props: b2Props,
		} = {},
		html,
	},
	{ timeout, extraStyles = {}, mainAttrs, status } = {}
) {
	return new Promise((resolve, reject) => {
		if (!process.browser) return reject("inBrowser");
		if (isBusy) return reject({ isBusy: true });
		else isBusy = true;
		const onClickWindow = ({ path }) => {
			if (!path.find(elem => elem === askWindow)) onRefuse();
		};
		const callback = () => {
			askWindow.style.opacity = 0;
			window.removeEventListener("click", onClickWindow);
			setTimeout(() => {
				document.body.removeChild(askWindow);
				isBusy = false;
			}, 500);
		};
		const onAccept = () => {
			resolve(true);
			callback();
		};
		const onRefuse = () => {
			resolve(false);
			callback();
		};
		var title, btn1, btn2;
		if (tText) {
			title = create({
				nodeName: tNodeName ?? "p",
				attrs: tAttrs,
				childs: tChilds,
				props: tProps,
				styles: tStyles,
				text: tText,
			});
		}
		btn1 = create({
			nodeName: "button",
			text: b1Text ?? "بله",
			attrs: { class: "btn btn-success pr-4 pl-4", ...b1attrs },
			styles: b1Styles,
			childs: b1Cilds,
			props: { ...b1Props, onclick: onAccept },
		});

		btn2 = create({
			nodeName: "button",
			text: b2Text ?? "خیر",
			attrs: { class: "btn btn-danger pr-4 pl-4", ...b2attrs },
			styles: b2Styles,
			childs: b2Cilds,
			props: { ...b2Props, onclick: onRefuse },
		});

		const btnWrapper = create({
			childs: [btn1, btn2],
			nodeName: "span",
			styles: btnWrapperStyles,
		});

		const close = create({
			nodeName: "i",
			props: { onclick: onRefuse },
			attrs: { class: "fa fa-times" },
			styles: closeStyles,
		});

		const inner = create({
			childs: [title, btnWrapper, close, ...(Array.isArray(html) ? html : [html])],
			styles: innerStyles,
		});

		const askWindow = create({
			styles: wrapperStyles({ ...extraStyles }),
			attrs: mainAttrs,
			childs: inner,
		});
		if (status !== "none") askWindow.classList.add(`bg-${status ?? "info"}`);
		document.body.appendChild(askWindow);
		defer(() => {
			// !!!!!!!!
			askWindow.style.opacity = 1;
			window.addEventListener("click", onClickWindow);
		});

		if (timeout)
			setTimeout(() => {
				onRefuse();
			}, timeout * 1000);
	});
}
