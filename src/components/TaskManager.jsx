import DatePicker from "../../node_modules/react-datepicker2/dist/es/index";
import styled from "styled-components";
import CopyBtn from "./task/CopyBtn";
import { Title } from "./task/Task";
import CheckBox from "./task/CheckBox";
import { useState } from "react";
import Star from "./task/Star";
import { parseDateFromServer, stringfyDateForServer } from "../helpers/exports";
import useTaskSelectore from "../hooks/taskSelector";

export default function TaskManager() {
	const taskData = useTaskSelectore();

	const {
		notFound,
		id: taskID,
		title: initialTitle,
		description: initialDescription,
		tags: initalTags,
		from_date: initaialFromDate,
		to_date: initaialToDate,
		is_done,
		is_favorite,
	} = taskData;

	const [fromDate, setFromDate] = useState(parseDateFromServer(initaialFromDate));
	const [toDate, setToDate] = useState(parseDateFromServer(initaialToDate));

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
					<WDatePicker className="content">
						<span>از</span>
						<DatePicker
							isGregorian={false}
							value={fromDate}
							onChange={d => setFromDate(d)}
						/>
					</WDatePicker>
				</Item>
				<Item>
					<div className="font">
						<img src="bag.svg" />
					</div>
					<WDatePicker className="content">
						<span>تا</span>
						<DatePicker
							isGregorian={false}
							value={toDate}
							onChange={d => setToDate(d)}
						/>
					</WDatePicker>
				</Item>
				<Item>
					<div className="font">
						<img src="tag.svg" />
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
			width: "18px",
			height: "18px",
			borderRadius: "4px",
			backgroundColor: "#F7F9FE",
			img: { width: "100%", height: "100%" },
		},
		"> .content": {
			...flex(["justifyContent"]),
			width: "100%",
			height: "30px",
			fontSize: "12px",
			marginRight: "10px",
			borderRadius: "4px",
			color: "#54698D",
			cursor: "pointer",
			backgroundColor: "#F7F9FE",
		},
	};
});

const WDatePicker = styled.div(props => {
	return {
		justifyContent: "flex-start",
		"> span": { fontSize: "14px", marginLeft: "5px" },
		"> div": {
			width: "auto",
			cursor: "pointer",
			input: {
				border: "none",
				outline: "none",
				padding: 0,
				backgroundColor: "transparent",
				textAlign: "center",
				cursor: "pointer",
				width: "100%",
			},
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
	return {
		...flex(["justifyContent"]),
		justifyContent: "flex-start",
		flexDirection: "column",
		...transition(),
		width: "400px",
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
