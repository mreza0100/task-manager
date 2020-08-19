import { copyToClipboard } from "../helpers/exports";
import { _USE_API_ } from "../api/index.API";
import showMsg from "../helpers/alerts/msg";
import ColorPicker from "./ColorPicker";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import Star from "./Star";

function handleCopy(taskID) {
	if (copyToClipboard(`${location.origin}/?id=${taskID}`)) {
		showMsg(
			{ title: { text: "با موفقیت کپی شد", nodeName: "h6" } },
			{ time: 3, status: "success", pendingID: `copy-${taskID}` }
		);
	} else {
		showMsg(
			{ title: { text: "مرورگر شما برای این کار قدیمی است" } },
			{ time: 5, status: "warning" }
		);
	}
}

export default function Task({ taskData }) {
	const { id: taskID, title, color, is_done, is_favorite, tags } = taskData;
	return (
		<TaskWrapper>
			<div className="right-hand">
				<ColorPicker color={color} taskID={taskID} />
				<Title isDone={is_done}>{title}</Title>
				{tags[0] && <p>{tags[0]}</p>}
				{tags[1] && <p>{tags[1]}</p>}
				<i
					className="fa fa-clone"
					onClick={() => handleCopy(taskID)}
					title="کپی URL تسک"
				/>
			</div>
			<div className="left-hand">
				<Star isFavorite={is_favorite} taskID={taskID} />
				<CheckBox isDone={is_done} taskID={taskID} />
			</div>
		</TaskWrapper>
	);
}

const TaskWrapper = styled.li(({ theme: { flex, $blue, $blueTxt, $white } }) => {
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
			"> i.fa-clone": {
				...flex(),
				width: "29px",
				height: "29px",
				borderRadius: "100px",
				fontSize: "13px",
				transition: "all 0.3s",
				color: "#E4EAF0",
				"&:hover": {
					backgroundColor: "#F6F9FE",
					color: $blueTxt,
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
