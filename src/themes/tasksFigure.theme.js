import { flex, transition } from "../helpers/exports";
import styled, { useTheme } from "styled-components";
import { useSelector } from "react-redux";

class generals {
	// TODO: add more bs classes and lesss styles
	// TODO: clean this mess
	static StyledP({ isDone }) {
		return {
			// p: {
			fontSize: 14,
			textAlign: "right",
			whiteSpace: "nowrap",
			maxWidth: "25ch",
			overflow: "hidden",
			textOverflow: "ellipsis",
			margin: 0,
			textDecoration: isDone ? "line-through" : "unset",
			// },
			"> span": { color: "#25d1e7c5", fontSize: 12 },
		};
	}
	static StyledTask({ backgroundColor, isSelectedTask }) {
		const { figure } = useTheme().TF;
		const border = figure === "table" && isSelectedTask ? "2px solid black" : "unset";
		return {
			backgroundColor,
			border,
			...transition(),
			width: "20%",
			cursor: "pointer",
			"&:hover": { opacity: "0.9" },
			"> span i.fa-clone": {
				borderRadius: "5px",
				padding: "6px",
				"&:hover": {
					border: "1px white solid",
					boxShadow: "1px 1px white",
				},
				"&:active": {
					border: "1px white solid",
					boxShadow: "1px 1px 5px white",
				},
			},
		};
	}
}

class line {
	static figure = "line";
	static classes = {
		main: "container",
		ul: "row",
		checkBox: "col-sm-1",
		star: "col-5",
		clone: "col-4",
		li: "col-md-10 row",
		firstSpan: "col-sm-3 row",
		info: "col-sm-8",
		secendSpan: "col-sm-2 row",
	};
	static styles = {
		StyledP: {
			...flex(["alignItems"]),
			alignItems: "flex-start",
			flexDirection: "column",
			width: "45%",
			height: "100%",
		},
		StyledTask: {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			height: "50px",
			margin: "8px 0",
			padding: "5px",
			"> span": {
				...flex(["justifyContent"]),
				justifyContent: "space-evenly",
				width: "48%",
				height: "100%",
				textAlign: "center",
			},
		},
	};
}

class table {
	static figure = "table";
	static classes = {
		main: "container-fluid",
		ul: "",
		checkBox: "",
		star: "",
		li: "col-4",
		firstSpan: "",
		info: "",
		secendSpan: "",
		clone: "",
	};
	static styles = {
		StyledP: {
			...flex(["justifyContent"]),
			justifyContent: "flex-start",
			width: "45%",
			height: "100%",
			padding: "5px",
		},
		StyledTask: {
			...flex(["justifyContent"]),
			flex: "0 0 30%",
			justifyContent: "space-between",
			alignItems: "flex-start",
			flexDirection: "column",
			maxWidth: "30%",
			minHeight: "100px",
			margin: "8px 5px",
			padding: "5px",
			"> span": {
				...flex(),
				justifyContent: "flex-start",
				width: "50%",
			},
			"> span + span": {
				...flex(["justifyContent"]),
				alignSelf: "flex-end",
				justifyContent: "space-evenly",
				height: "35px",
				width: "35%",
			},
		},
	};
}

// styled components
export const StyledP = styled.p(({ theme, isDone }) => {
	const { styles } = theme.TF;
	return {
		...styles.StyledP,
		...generals.StyledP({ isDone }),
	};
});

export const StyledTask = styled.li(({ theme, backgroundColor, isSelectedTask }) => {
	const { styles } = theme.TF;
	return {
		...styles.StyledTask,
		...generals.StyledTask({ backgroundColor, isSelectedTask }),
	};
});

export default function useTasksFigure(props) /*for theme provider*/ {
	const figure = useSelector(state => state.profile.tasksFigure);
	switch (figure) {
		case "line":
			return line;
		case "table":
			return table;
		default:
			return "line";
	}
}
