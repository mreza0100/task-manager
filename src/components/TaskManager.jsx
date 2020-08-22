import useTaskSelector from "../hooks/taskSelector";
import { useRouter } from "next/router";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import CopyBtn from "./CopyBtn";
import Star from "./Star";

export default function TaskManager() {
	const router = useRouter();
	const { id: taskID } = router.query;
	if (!taskID) return noTask;

	const {
		notFound,
		title: initialTitle,
		description: initialDescription,
		tags: initalTags,
		from_date: initaialFromDate,
		to_date: initaialToDate,
		is_done,
		is_favorite,
	} = useTaskSelector({ taskID });
	if (notFound) return noTask;

	return (
		<Manager>
			<TopManager>
				<div>
					<CheckBox isDone={is_done} taskID={taskID} />
					<span>{initialTitle}</span>
				</div>
				<div>
					<Star taskID={taskID} isFavorite={is_favorite} />
					<CopyBtn taskID={taskID} />
				</div>
			</TopManager>
			<ManagerItems>
				<Item>
					<div className="font">
						<img src="bag.svg" />
					</div>
				</Item>
				<Item>
					<div className="font">
						<img src="bag.svg" />
					</div>
				</Item>
				<Item>
					<div className="font">
						<img src="bag.svg" />
					</div>
				</Item>
			</ManagerItems>
		</Manager>
	);
}

const Item = styled.div(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		width: "100%",
	};
});

const ManagerItems = styled.div(({ theme: { flex } }) => {
	return {
		...flex(),
		flexDirection: "column",
		width: "100%",
		padding: "10px",
	};
});

const TopManager = styled.div(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		height: "70px",
		width: "100%",
		padding: "0 15px",
		borderBottom: "1px solid #F1F4F6",
		"> div": {
			...flex(["justifyContent"]),
			height: "100%",
			"> span": { color: "#54698D", fontSize: "16px" },
			"> * ": {
				margin: "0 7px",
			},
		},
	};
});

const Manager = styled.aside(({ theme: { flex, $white, transition } }) => {
	const router = useRouter();
	const { id: routerID } = router.query;
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		flexDirection: "column",
		...transition(),
		width: routerID ? "400px" : "300px",
		borderRight: "1px solid #E4EAF0",
		backgroundColor: $white,
		"> #no-task": {
			height: "10%",
			margin: "auto",
		},
	};
});

const noTask = (
	<Manager>
		<h3 id="no-task">هیچ تسکی برای نمایش انتخاب نشده است</h3>
	</Manager>
);
