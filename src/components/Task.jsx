import styled from "styled-components";
import { useDispatch } from "react-redux";
import showMsg from "../helpers/alerts/msg";
import { editTask } from "../redux/actions/tasks";
import { _USE_API_ } from "../api/index.API";

function ColorPicker({ color }) {
	// TODO: give it a relative position to stick on right side
	return <input type="color" value={color} />;
}

const CheckBox = ({ isDone, taskID }) => {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			dispatch(editTask({ newTask: { id: taskID, is_done: !isDone } }));
			await _USE_API_({
				isPrivetRoute: true,
				describe: "toggle CheckBox",
			}).Put({
				data: { is_done: !isDone, id: taskID },
				url: "/tasks",
			});
		} catch (err) {
			showMsg(
				{
					title: { text: "مشکل شبکه" },
					body: { text: "درخواست انجام نشد" },
				},
				{ status: "danger" }
			);
			dispatch(editTask({ newTask: { id: taskID, is_done: isDone } }));
		}
	};

	return (
		<CheckBox_styled onClick={handleSubmit} selected={isDone}>
			<i className="fa fa-check" />
		</CheckBox_styled>
	);
};

const CheckBox_styled = styled.div(({ theme: { flex, $bolderBlue, $white }, selected }) => {
	return {
		...flex(),
		width: "18px",
		height: "18px",
		padding: "5px",
		borderRadius: "4px",
		backgroundColor: selected ? $bolderBlue : "#E4EAF0",
		cursor: "pointer",
		transition: "all 0.3s",
		"> i": {
			opacity: selected ? 1 : 0,
			color: $white,
			fontSize: "12px",
		},
	};
});

function Star({ isFavorite, taskID }) {
	const dispatch = useDispatch();
	const handleSubmit = async () => {
		try {
			dispatch(editTask({ newTask: { id: taskID, is_favorite: !isFavorite } }));
			await _USE_API_({
				isPrivetRoute: true,
				describe: "toggle isFavorite",
			}).Put({
				data: { is_favorite: !isFavorite, id: taskID },
				url: "/tasks",
			});
		} catch (err) {
			showMsg(
				{
					title: { text: "مشکل شبکه" },
					body: { text: "درخواست انجام نشد" },
				},
				{ status: "danger" }
			);
			dispatch(editTask({ newTask: { id: taskID, is_favorite: isFavorite } }));
		}
	};

	return (
		<img
			onClick={handleSubmit}
			className="star"
			src={`${isFavorite ? "selected-" : ""}star.svg`}
		/>
	);
}

export default function Task({ taskData }) {
	const { id: taskID, title, color, is_done, is_favorite, tags } = taskData;
	return (
		<TaskWrapper>
			<div className="right-hand">
				<ColorPicker color={color} />
				<Title isDone={is_done}>{title}</Title>
				{tags[0] && <p>{tags[0]}</p>}
				{tags[1] && <p>{tags[1]}</p>}
			</div>
			<div className="left-hand">
				<Star isFavorite={is_favorite} taskID={taskID} />
				<CheckBox isDone={is_done} taskID={taskID} />
			</div>
		</TaskWrapper>
	);
}

const TaskWrapper = styled.li(({ theme: { flex, $blue, $white } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		width: "100%",
		height: 50,
		backgroundColor: $white,
		boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "4px",
		padding: 5,
		marginBottom: 10,
		"> div.right-hand": {
			height: "100%",
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			"> p": { color: $blue },
			"> input[type='color']": {
				margin: 0,
				padding: 0,
				border: "0 !important",
				outline: "none !important",
				boxShadow: "0 !important",
				width: "45px",
				height: "22px",
				transform: "rotate(90deg)",
				backgroundColor: "transparent",
				"&:focus": {
					boxShadow: "none",
				},
			},
		},
		"> div.left-hand": {
			height: "100%",
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			"> * ": {
				margin: "0 10px",
			},
			"> img.star": {
				cursor: "pointer",
				height: "18px",
				width: "18px",
			},
		},
	};
});
const Title = styled.span(({ theme: { flex, $black }, isDone }) => {
	return {
		color: $black,
		textDecoration: isDone ? "line-through" : "unset",
		margin: "0 20px",
	};
});
