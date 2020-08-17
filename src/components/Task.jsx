import styled from "styled-components";
export default function Task({ taskData }) {
	const { id: taskID, title, color, is_done, is_favorite, tags } = taskData;
	return (
		<TaskWrapper>
			<div className="right-hand">
				<input type="color" />
				<Title isDone={is_done}>{title}</Title>
			</div>
			<div className="left-hand"></div>
		</TaskWrapper>
	);
}

const Title = styled.span(({ theme: { flex, $black }, isDone }) => {
	return {
		color: $black,
		textDecoration: isDone ? "line-through" : "unset",
	};
});

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
			width: "40%",
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			"> input": {
				width: "10%",
				transform: "rotate(90deg)",
			},
		},
	};
});
