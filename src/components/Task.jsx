import { _USE_API_ } from "../api/index.API";
import ColorPicker from "./ColorPicker";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import Star from "./Star";

export default function Task({ taskData }) {
	const { id: taskID, title, color, is_done, is_favorite, tags } = taskData;
	return (
		<TaskWrapper>
			<div className="right-hand">
				<ColorPicker color={color} taskID={taskID} />
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
