import create from "./elementFactory";
import { flex, defer } from "../exports";

const getStyles = () => ({
	parentAllStyles: {
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		opacity: 0,
		backgroundColor: "rgb(0 0 0 / 53%)",
		transition: "opacity 0.5s",
	},
	outerWrapperStyles: {
		position: "fixed",
		height: "250px",
		width: "500px",
		top: "25%",
		left: "50%",
		marginLeft: "auto",
		marginRight: "auto",
		transform: "translate(-50%, 0)",
		background: "#FFFFFF",
		boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "10px",
	},
	innerWrapperStyles: {
		...flex(),
		position: "relative",
		width: "100%",
		height: "100%",
	},
	closeIStyles: {
		position: "absolute",
		right: "10px",
		top: "10px",
		cursor: "pointer",
		padding: "10px",
		color: "#DADADA",
		fontSize: "12px",
	},
	contentStyles: {
		...flex(),
		flexWrap: "wrap",
		alignContent: "flex-start",
		width: "270px",
		height: "80%",
	},
	titleStyles: {
		margin: 0,
		color: "#54698D",
		width: "100%",
		fontSize: "25px",
		textAlign: "center",
		whiteSpace: "pre",
		paddingBottom: "10px",
	},
	describeStyles: {
		width: "100%",
		color: "#54698D",
		marginBottom: "28px",
		fontSize: "14px",
		textAlign: "center",
	},
	btnRightStyles: {
		width: "129px",
		height: "50px",
		color: "#FF6672",
		backgroundColor: "transparent",
		fontSize: "14px",
		border: "1px solid #FF6672",
		// marginLeft: "2.5px",
		borderRadius: "4px",
	},
	btnLeftStyles: {
		width: "129px",
		height: "50px",
		color: "#FFF",
		backgroundColor: "#2CDA9B",
		fontSize: "14px",
		border: "none",
		marginRight: "auto",
		borderRadius: "4px",
	},
});

var isBusy;
export default function ask(
	{
		title: { text: tText, styles: tStyles, props: tProps } = {},
		describe: { text: dText, styles: dStyles, props: dProps } = {},
		btnRight: { text: bRText, styles: bRStyles, props: bRProps } = {},
		btnLeft: { text: bLText, styles: bLStyles, props: bLProps } = {},
	},
	{ timeout, mainAttrs, status, extraStyles = {} } = {}
) {
	return new Promise((resolve, reject) => {
		if (!process.browser) return reject("inBrowser");
		if (isBusy) return reject({ isBusy: true });
		isBusy = true;

		const handleDelete = () => {
			parentAll.style.opacity = 0;
			setTimeout(() => {
				try {
					document.body.removeChild(parentAll);
					// some times its throwing error but its just fine to do this
				} catch (err) {}
				isBusy = false;
			}, 500);
		};
		const refuseOnEscape = ({ which, keyCode }) => {
			// 27 is for Escape
			if ((which ?? keyCode) === 27) {
				window.removeEventListener("keydown", refuseOnEscape);
				onRefuse();
			}
		};
		const onClickParentAll = ({ target }) => {
			if (!outerWrapper.contains(target)) onRefuse();
		};

		const onAccept = () => {
			resolve(true);
			handleDelete();
		};
		const onRefuse = () => {
			resolve(false);
			handleDelete();
		};

		var title, describe, btnRight, btnLeft, closeI, content, parentAll, outerWrapper, innerWrapper;
		const {
			btnLeftStyles,
			btnRightStyles,
			closeIStyles,
			contentStyles,
			describeStyles,
			innerWrapperStyles,
			outerWrapperStyles,
			parentAllStyles,
			titleStyles,
		} = getStyles();
		title = create({
			nodeName: "h4",
			styles: titleStyles,
			props: tProps,
			text: tText,
		});
		describe = create({
			nodeName: "p",
			styles: describeStyles,
			text: dText,
			props: dProps,
		});
		btnRight = create({
			nodeName: "button",
			styles: btnRightStyles,
			text: bRText,
			props: bRProps,
			events: { click: onRefuse },
		});
		btnLeft = create({
			nodeName: "button",
			styles: btnLeftStyles,
			text: bLText,
			props: bLProps,
			events: { click: onAccept },
		});
		content = create({
			nodeName: "div",
			styles: contentStyles,
			childs: [title, describe, btnRight, btnLeft],
		});
		closeI = create({
			nodeName: "i",
			styles: closeIStyles,
			props: { className: "fa fa-times" },
			events: { click: onRefuse },
		});
		innerWrapper = create({
			nodeName: "div",
			styles: innerWrapperStyles,
			childs: [closeI, content],
		});
		outerWrapper = create({
			nodeName: "div",
			styles: outerWrapperStyles,
			childs: innerWrapper,
		});
		parentAll = create({
			nodeName: "div",
			styles: parentAllStyles,
			events: { click: onClickParentAll },
			childs: outerWrapper,
		});

		document.body.appendChild(parentAll);
		defer(() => {
			parentAll.style.opacity = 1;
			window.addEventListener("keydown", refuseOnEscape);
		});
		if (timeout) {
			setTimeout(() => {
				onRefuse();
			}, timeout * 1000);
		}
	});
}
