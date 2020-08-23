import useTaskSelector from "../hooks/taskSelector";
import { useRouter } from "next/router";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import { useState } from "react";
import CopyBtn from "./CopyBtn";
import { Title } from "./Task";
import Star from "./Star";

import moment from "moment-jalaali";
import DatePicker from "../proxy";

export default function TaskManager() {
	const taskSelector = useTaskSelector();
	const router = useRouter();
	const [value, setValue] = useState(moment("2020-06-21 19:30:00.000Z"));

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
	} = taskSelector({ taskID });
	if (notFound) return noTask;

	return (
		<Manager>
			<HeadManager>
				<div>
					<CheckBox isDone={is_done} taskID={taskID} />
					<Title isDone={is_done}>{initialTitle}</Title>
				</div>
				<div>
					<Star taskID={taskID} isFavorite={is_favorite} />
					<CopyBtn taskID={taskID} />
				</div>
			</HeadManager>
			<ManagerItems>
				<Item>
					<div className="font">
						<img src="bag.svg" />
					</div>
					<div className="content">
						<DatePicker
							isGregorian={false}
							value={value}
							onChange={val => setValue(val)}
						/>
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
		marginTop: "20px",
		"> .font": {
			...flex(),
			width: "30px",
			height: "30px",
			borderRadius: "4px",
			backgroundColor: "#F7F9FE",
		},
		"> .content": {
			...flex(["justifyContent"]),
			justifyContent: "flex-start",
			width: "100%",
			height: "30px",
			fontSize: "12px",
			paddingRight: "10px",
			marginRight: "10px",
			borderRadius: "4px",
			color: "#54698D",
			cursor: "pointer",
			backgroundColor: "#F7F9FE",
		},
	};
});

const ManagerItems = styled.div(({ theme: { flex } }) => {
	return {
		width: "100%",
		height: "auto",
		padding: "0 20px",
		marginBottom: "10px",
	};
});

const HeadManager = styled.div(({ theme: { flex } }) => {
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
