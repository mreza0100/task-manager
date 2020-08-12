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
			backgroundColor: "#454F4F",
			border,
			...transition(),
			width: "20%",
			cursor: "pointer",
			opacity: "0.95",
			"&:hover": { opacity: 1 },
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
			"span + span": {
				backgroundImage: `linear-gradient(90deg, ${backgroundColor}, transparent)`,
			},
		};
	}
}

class line {
	static figure = "line";
	static classes = {
		main: "container row m-auto",
		ul: "col-12 row",
		checkBox: "col-sm-1",
		star: "col-5",
		clone: "col-5",
		li: "col-10 row",
		firstSpan: "col-sm-3 row",
		info: "col-sm-8",
		secendSpan: "col-sm-2 row p-0 justify-content-end",
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
	// TODO: add classes for table figure!!!
	static figure = "table";
	static classes = {
		main: "container-fluid",
		ul: "mt-3",
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
			padding: "5px 5px 0 0",
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

export default function useTasksFigure(props) /*for _app*/ {
	const figure = useSelector(state => state.profile.tasks_figure);
	switch (figure) {
		case "line":
			return line;
		case "table":
			return table;
		default:
			return {
				figure: "",
				classes: {},
				styles: {},
			};
	}
}
