import styled from "styled-components";
import { useState } from "react";

export default function DropDownMenu({ children, title, parentStyles, ulStyles }) {
	const [open, setOpen] = useState(false);

	const onToggleOpen = () => {
		setOpen(!open);
	};

	return (
		<DropDown parentStyles={parentStyles} open={open}>
			<span onClick={onToggleOpen}>
				{title}
				<i className="icon-drop-arrow" />
			</span>
			<Ul open={open} ulStyles={ulStyles}>
				{open && children}
			</Ul>
		</DropDown>
	);
}

const Ul = styled.ul(({ theme: { flex }, open, ulStyles }) => {
	const extraStyles = ulStyles ? ulStyles(open) : {};
	return {
		display: "inherit",
		position: "absolute",
		backgroundColor: "#FFF",
		overflow: "hidden",
		minWidth: "100%",
		top: "30px",
		left: "unset",
		right: 0,
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		flexDirection: "column",
		transition: "all 0.3s",
		height: open ? "100px" : "0px",
		...extraStyles,
	};
});

const DropDown = styled.div(({ theme: { flex, $blueTxt }, open, parentStyles }) => {
	const extraStyles = parentStyles ? parentStyles(open) : {};
	return {
		...flex(),
		minWidth: "110px",
		minHeight: "30px",
		borderRadius: "4px",
		color: $blueTxt,
		fontSize: "12px",
		backgroundColor: "rgba(111, 160, 241, 0.15)",
		position: "relative",
		cursor: "pointer",
		span: {
			...flex(["justifyContent"]),
			justifyContent: "space-evenly",
			width: "100%",
			height: "100%",
			textAlign: "center",
			lineHeight: "2.4",
			userSelect: "none",
			"> i": {
				...flex(),
				transition: "all 0.3s",
				fontSize: "8px",
				width: "20px",
				transform: open ? "rotate(180deg)" : "unset",
			},
		},
		...extraStyles,
	};
});

// const _ = styled.div(({ theme: { flex, $blueTxt, $black }, extraStyles }) => {
// 	return {
// 		...flex(["justifyContent"]),
// 		justifyContent: "flex-end",
// 		width: "30%",
// 		"> div": {
// 			...flex(),
// 			minWidth: "40%",
// 			minHeight: "30px",
// 			borderRadius: "4px",
// 			color: $blueTxt,
// 			fontSize: "12px",
// 			backgroundColor: "rgba(111, 160, 241, 0.15)",
// 			position: "relative",
// 			padding: "0 10px",
// 			cursor: "pointer",
// 			"> div.menu": {
// 				display: "inherit",
// 				position: "absolute",
// 				backgroundColor: "#FFF",
// 				overflow: "hidden",
// 				minWidth: "100%",
// 				top: "30px",
// 				left: "unset",
// 				right: 0,
// 				...flex(["justifyContent"]),
// 				justifyContent: "space-evenly",
// 				flexDirection: "column",
// 				padding: "0 10px",
// 				transition: "all 0.3s",
// 				height: "0px",
// 			},
// 			"&:hover": {
// 				".menu": {
// 					height: "100px",
// 				},
// 			},
// 		},
// 		"> div + div": { marginRight: "10px", "div.menu": { left: 0, right: "unset" } },
// 		...extraStyles,
// 	};
// });
