import create from "./elementFactory";
import { flex, transition } from "../exports";

const wrapperStyles = ({ extraStyles }) => {
	var width = window.innerWidth < 500 ? "100%" : "50%";
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		flexDirection: "column",
		width,
		height: "30vh",
		minHeight: "120px",
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
	{ timeout, extraStyles = {}, mainAttrs, status } = {},
) {
	return new Promise((resolve, reject) => {
		if (!process.browser) return reject("inBrowser");
		if (!isBusy) isBusy = true;
		else return reject({ isBusy: true });
		const callback = () => {
			askWindow.style.opacity = 0;
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
				nodeName: tNodeName ?? "h5",
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
			props: { b1Props, onclick: onAccept },
		});

		btn2 = create({
			nodeName: "button",
			text: b2Text ?? "خیر",
			attrs: { class: "btn btn-danger pr-4 pl-4", ...b2attrs },
			styles: b2Styles,
			childs: b2Cilds,
			props: { b2Props, onclick: onRefuse },
		});

		const btnWrapper = create({
			childs: [btn1, btn2],
			nodeName: "span",
			styles: btnWrapperStyles,
		});
		const askWindow = create({
			styles: wrapperStyles({ ...extraStyles }),
			attrs: mainAttrs,
			childs: [title, btnWrapper, ...(Array.isArray(html) ? html : [html])],
		});
		if (status !== "none") askWindow.classList.add(`bg-${status ?? "info"}`);
		document.body.appendChild(askWindow);
		setTimeout(() => {
			askWindow.style.opacity = 1;
		}, 0);
		if (timeout)
			setTimeout(() => {
				onRefuse();
			}, timeout * 1000);
	});
}
