import { flex, transition, copyToClipboard } from "../helpers/exports";
import styled, { useTheme } from "styled-components";
import { editTask } from "../redux/actions/tasks";
import { _USE_API_ } from "../api/index.API";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import TaskManager, { formikStyles } from "./TaskManager";

// !CheckBox component
const CheckBox = ({ isDone, taskID }) => {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			const res = await _USE_API_({ isPrivetRoute: true, pendingID: taskID }).Put({
				data: { is_done: !isDone, id: taskID },
				url: "/tasks",
			});
			if (res.status === 200)
				dispatch(editTask({ newTask: { id: taskID, is_done: !isDone } }));
		} catch (err) {
			console.dir(err);
		}
	};
	const { classes } = useTheme().TF;
	return (
		<CheckBoxTag
			onClick={handleSubmit}
			className={classes.checkBox}
			opacity={isDone ? 1 : 0}
		>
			<i className="fa fa-check" />
		</CheckBoxTag>
	);
};

const CheckBoxTag = styled.div(({ opacity }) => {
	return {
		...flex(),
		height: "35px",
		width: "35px",
		// minWidth: "35px",
		backgroundColor: "#228a4d5e",
		borderRadius: "5px",
		cursor: "pointer",
		"> i": {
			opacity,
			...transition(0.3),
		},
	};
});
// !CheckBox component

// ! Star component
const Star = ({ isFavorite, taskID }) => {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			const res = await _USE_API_({ isPrivetRoute: true, pendingID: taskID }).Put({
				data: { is_favorite: !isFavorite, id: taskID },
				url: "/tasks",
			});
			if (res.status === 200) {
				dispatch(editTask({ newTask: { id: taskID, is_favorite: !isFavorite } }));
			}
		} catch (err) {
			console.dir(err);
		}
	};
	const { classes } = useTheme().TF;
	return (
		<StarTag
			onClick={handleSubmit}
			className={`fa fa-star ${classes.star}`}
			starColor={isFavorite ? "#b7ff07" : "unset"}
		/>
	);
};

const StarTag = styled.i(({ starColor: color }) => {
	return {
		color,
		padding: "4px",
		cursor: "pointer",
		...transition(0.3),
	};
});
// ! Star component

export default function Task({ taskData }) {
	const { id: taskID, title, color, is_done, is_favorite } = taskData;
	const router = useRouter();
	const { id: routerID } = router.query;
	const { classes, figure } = useTheme().TF;
	const isOpenTask = taskID === routerID && figure === "line";
	return (
		<>
			<StyledTask
				backgroundColor={color}
				className={classes.li}
				target={taskID}
				// TODO: change contextMenu
			>
				<span className={classes.firstSpan}>
					<CheckBox isDone={is_done} taskID={taskID} />
					<StyledInfo isDone={is_done} className={classes.info}>
						{/* TODO: make it one element */}
						<p>{title}</p>
					</StyledInfo>
				</span>
				<span className={classes.secendSpan}>
					<i
						className={`fa fa-clone ${classes.clone}`}
						title="کپی URL تسک"
						onClick={() => copyToClipboard(`${location.origin}/?id=${taskID}`)}
					/>
					<Star isFavorite={is_favorite} taskID={taskID} />
				</span>
			</StyledTask>
			{isOpenTask && (
				<TaskManagerWrapper className="col-md-9">
					<TaskManager taskID={taskID} />
				</TaskManagerWrapper>
			)}
		</>
	);
}

const TaskManagerWrapper = styled.li(props => {
	return {
		...flex(),
		flexDirection: "column",
		width: "100%",
		height: "auto",
		padding: "20px 0",
		backgroundColor: "#28596157",
		overflow: "hidden",
		position: "relative",
		bottom: "8px",
		...formikStyles,
	};
});

const StyledInfo = styled.div(({ theme, isDone }) => {
	// TODO: clean this mess
	const general = {
		...isDone,
		p: {
			fontSize: 14,
			textAlign: "right",
			whiteSpace: "nowrap",
			maxWidth: "25ch",
			overflow: "hidden",
			textOverflow: "ellipsis",
			margin: 0,
			color: "red",
			textDecoration: isDone ? "line-through" : "unset",
		},
		"> span": { color: "#25d1e7c5", fontSize: 12 },
	};
	switch (theme.TF.figure) {
		case "line":
			return {
				...general,
				...flex(["alignItems"]),
				alignItems: "flex-start",
				flexDirection: "column",
				width: "45%",
				height: "100%",
			};
		case "table":
			return {
				...general,
				...flex(["justifyContent"]),
				justifyContent: "flex-start",
				width: "45%",
				height: "100%",
				"> p": {
					padding: "5px",
				},
			};
	}
});

const StyledTask = styled.li(({ theme, backgroundColor }) => {
	const general = {
		backgroundColor,
		...transition(),
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
	switch (theme.TF.figure) {
		case "line":
			return {
				...general,
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
			};
		case "table":
			return {
				...general,
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
					width: "20%",
				},
			};
	}
});
