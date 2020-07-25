import { flex, transition, copyToClipboard } from "../helpers/exports";
import { StyledP, StyledTask } from "../themes/tasksFigure.theme";
import TaskManager, { formikStyles } from "./TaskManager";
import styled, { useTheme } from "styled-components";
import { editTask } from "../redux/actions/tasks";
import { _USE_API_ } from "../api/index.API";
import showMsg from "../helpers/alerts/msg";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

// !CheckBox component
const CheckBox = ({ isDone, taskID }) => {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			const res = await _USE_API_({
				isPrivetRoute: true,
				pendingID: taskID,
				describe: "toggle CheckBox",
			}).Put({
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
		<StyledCheckbox
			onClick={handleSubmit}
			className={classes.checkBox}
			opacity={isDone ? 1 : 0}
		>
			<i className="fa fa-check" />
		</StyledCheckbox>
	);
};

export const StyledCheckbox = styled.div(({ opacity, extraStyles = {} }) => {
	return {
		...flex(),
		height: "35px",
		width: "35px",
		backgroundColor: "#228a4d5e",
		borderRadius: "5px",
		cursor: "pointer",
		textAlign: "center",
		"> i": {
			opacity,
			...transition(0.3),
		},
		...extraStyles,
	};
});
// !CheckBox component

// ! Star component
const Star = ({ isFavorite, taskID }) => {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			const res = await _USE_API_({
				isPrivetRoute: true,
				pendingID: taskID,
				describe: "toggle isFavorite",
			}).Put({
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
		<StyledStar
			onClick={handleSubmit}
			className={`fa fa-star ${classes.star}`}
			starColor={isFavorite ? "#b7ff07" : "unset"}
		/>
	);
};

export const StyledStar = styled.i(({ starColor: color, extraStyles = {} }) => {
	return {
		color,
		padding: "4px",
		cursor: "pointer",
		textAlign: "center",
		...transition(0.3),
		...extraStyles,
	};
});
// ! Star component

function handleCopy(taskID) {
	if (copyToClipboard(`${location.origin}/?id=${taskID}`))
		showMsg(
			{ title: { text: "با موفقیت کپی شد", nodeName: "h6" } },
			{ time: 3, status: "success" },
		);
	else
		showMsg(
			{ title: { text: "مرورگر شما برای این کار قدیمی است" } },
			{ time: 5, status: "warning" },
		);
}

export default function Task({ taskData }) {
	const { id: taskID, title, color, is_done, is_favorite } = taskData;
	const router = useRouter();
	const { id: routerID } = router.query;
	const { classes, figure } = useTheme().TF;
	const isOpenTask = taskID === routerID && figure === "line";
	return (
		<>
			<StyledTask
				isSelectedTask={taskID === routerID}
				backgroundColor={color}
				className={classes.li}
				target={taskID}
				// TODO: change contextMenu
			>
				<span className={classes.firstSpan}>
					<CheckBox isDone={is_done} taskID={taskID} />
					<StyledP isDone={is_done} className={classes.info}>
						{title}
					</StyledP>
				</span>
				<span className={classes.secendSpan}>
					<i
						className={`fa fa-clone ${classes.clone}`}
						title="کپی URL تسک"
						onClick={() => handleCopy(taskID)}
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
