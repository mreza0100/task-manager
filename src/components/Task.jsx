import { _USE_API_ } from "../api/index.API";
import { useRouter } from "next/router";
import ColorPicker from "./ColorPicker";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import CopyBtn from "./CopyBtn";
import Star from "./Star";

export default function Task({ taskData }) {
	const { id: taskID, title, color, is_done, is_favorite, tags } = taskData;
	const router = useRouter();
	const routerID = router.query.id;
	const selectedMe = routerID === taskID;
	const checkPassQuery = ({ target }) => {
		if (!target.classList.contains("open")) return;
		if (selectedMe) return router.push("/", undefined, { shallow: true });
		router.push(`/?id=${taskID}`, undefined, { shallow: true });
	};

	return (
		<TaskWrapper onClick={checkPassQuery} className="open" selectedMe={selectedMe}>
			<div className="right-hand open">
				<ColorPicker color={color} taskID={taskID} />
				<Title isDone={is_done} className="open">
					{title}
				</Title>
				{tags[0] && <p>{tags[0]}</p>}
				{tags[1] && <p>{tags[1]}</p>}
				<CopyBtn taskID={taskID} />
			</div>
			<div className="left-hand open">
				<Star isFavorite={is_favorite} taskID={taskID} />
				<CheckBox isDone={is_done} taskID={taskID} />
			</div>
		</TaskWrapper>
	);
}

const TaskWrapper = styled.li(({ theme: { flex, $blue, $blueTxt, $white }, selectedMe }) => {
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
		border: selectedMe ? "2px solid #5460FE" : "unset",
		cursor: "pointer",
		transition: "all 0.2s",
		"&:hover": {},
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
