import { parseDateFromServer, stringfyDateForServer, trimObj } from "../helpers/exports";
import { getOneAndOverwrite } from "../redux/actions/tasks";
import useTaskSelectore from "../hooks/taskSelector";
import { _USE_API_ } from "../api/index.API";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker2";
import { useDispatch } from "react-redux";
import TagsInput from "react-tagsinput";
import styled from "styled-components";
import CheckBox from "./task/CheckBox";
import CopyBtn from "./task/CopyBtn";
import { Title } from "./task/Task";
import { tasks } from "../routes";
import Router from "next/router";
import Star from "./task/Star";

async function handleDeleteTask(taskID) {
	try {
		const data = { id: taskID };
		const res = await _USE_API_({
			isPrivetRoute: true,
			describe: "deleting a task",
			debug: false,
		}).Delete({ data, url: "/tasks" });
		if (res.status === 200) Router.replace(tasks);
	} catch (err) {}
}

async function handleSubmit(data, { dispatch }) {
	try {
		data = {
			id: data.id,
			description: data.description,
			tags: data.tags,
			from_date: stringfyDateForServer(data.fromDate),
			to_date: stringfyDateForServer(data.toDate),
		};
		data = trimObj(data, { removeEmptyArr: true });
		const { id: taskID } = data;
		const res = await _USE_API_({
			isPrivetRoute: true,
			describe: "saving Task-manager changes",
			debug: false,
		}).Put({ url: "/tasks", data });
		if (res.status === 200) dispatch(getOneAndOverwrite({ taskID }));
	} catch (err) {
		console.log(err);
	}
}

export default function TaskManager() {
	const dispatch = useDispatch();
	const {
		notFound,
		id: taskID,
		title: initialTitle,
		description: initialDescription,
		tags: initalTags = [],
		from_date: initaialFromDate,
		to_date: initaialToDate,
		is_done,
		is_favorite,
	} = useTaskSelectore({ alertOnNotFound: false });
	const [fromDate, setFromDate] = useState(parseDateFromServer(initaialFromDate));
	const [toDate, setToDate] = useState(parseDateFromServer(initaialToDate));
	const [description, setDescription] = useState(initialDescription);
	const [tags, setTags] = useState(initalTags);

	useEffect(() => {
		if (!taskID) return undefined;
		setFromDate(parseDateFromServer(initaialFromDate));
		setToDate(parseDateFromServer(initaialToDate));
		setDescription(initialDescription);
		setTags(initalTags);
	}, [taskID]);

	const handleChangeTag = newTags => setTags(newTags);
	const tagJSX = props => {
		const { tag, key, onRemove, className, getTagDisplayValue } = props;
		return (
			<span key={key} className={className} onClick={e => onRemove(key)}>
				{getTagDisplayValue(tag)}
				<i>×</i>
			</span>
		);
	};

	if (notFound) return noTask;
	return (
		<LeftAside extraStyles={{ height: "unset" }}>
			<div style={{ width: "100%" }}>
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
							<i className="icon-bag" />
						</div>
						<div className="content date">
							<span>از</span>
							<DatePicker
								isGregorian={false}
								value={fromDate}
								onChange={d => setFromDate(d)}
							/>
						</div>
					</Item>
					<Item>
						<div className="font">
							<i className="icon-bag" />
						</div>
						<div className="content date">
							<span>تا</span>
							<DatePicker
								isGregorian={false}
								value={toDate}
								onChange={d => setToDate(d)}
							/>
						</div>
					</Item>
					<Item>
						<div className="font">
							{/* TODO: remove tag img */}
							<img src={require("../assets/svg/tag.svg")} />
						</div>
						<div className="content tags">
							<TagsInput
								value={tags}
								onChange={handleChangeTag}
								renderTag={tagJSX}
								inputProps={{ placeholder: "اضافه کردن تگ" }}
							/>
						</div>
					</Item>
					<Item id="description">
						<div className="font">
							<i className="icon-pen" />
						</div>
						<div className="content">
							<textarea
								placeholder="افزودن متن"
								value={description}
								onChange={({ target }) => setDescription(target.value)}
							/>
						</div>
					</Item>
				</ManagerItems>
			</div>
			<Footer>
				<Item>
					<div className="font"></div>
					<div className="content">
						<button
							className="btn"
							onClick={() => {
								handleSubmit(
									{ id: taskID, toDate, fromDate, description, tags },
									dispatch
								);
							}}
						>
							ثبت
						</button>
						<i className="fa fa-trash" onClick={() => handleDeleteTask(taskID)} />
					</div>
				</Item>
			</Footer>
		</LeftAside>
	);
}

const Footer = styled.div(({ theme: { flex, $bolderBlue } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		// margin: "auto auto 10px auto",
		minHeight: "25px",
		width: "90%",
		height: "60px",
		"> div": {
			width: "100%",
		},
		".font": { backgroundColor: "transparent !important" },
		".content": {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			width: "100%",
			backgroundColor: "transparent !important",
			cursor: "default",
			"> button": {
				...flex(),
				backgroundColor: $bolderBlue,
				height: "50%",
				fontSize: "12px",
				cursor: "pointer",
			},
			"> i": {
				// padding: "8px",
				fontSize: "20px",
				cursor: "pointer",
				transition: "color 0.3s",
				"&:hover": {
					color: "red",
				},
			},
		},
	};
});

const Item = styled.div(({ theme: { flex, $black } }) => {
	return {
		...flex(["justifyContent", "alignItems"]),
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginTop: "20px",
		"> .font": {
			...flex(),
			width: "30px",
			height: "auto",
			minHeight: "35px",
			borderRadius: "4px",
			backgroundColor: "#F7F9FE",
			i: { width: "75%", height: "75%", color: "#6FA0F1" },
		},
		"> .content": {
			...flex(["justifyContent"]),
			width: "90%",
			height: "auto",
			minHeight: "35px",
			paddingRight: "8px",
			fontSize: "12px",
			marginRight: "10px",
			borderRadius: "4px",
			color: $black,
			backgroundColor: "#F7F9FE",
			cursor: "pointer",
		},
		"> div.date": {
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
		},
		"> .tags": {
			input: {
				border: "none",
				outline: "none",
				padding: 0,
				backgroundColor: "transparent",
				marginRight: "5px",
				"&::placeholder": {
					textAlign: "right",
				},
			},
		},
		"&#description": {
			".font": { background: "rgba(218, 179, 44, 0.15)", i: { color: "#DAB32C" } },
			".content": {
				paddingRight: 0,
				minHeight: "74px",
				backgroundColor: "transparent",
				textarea: {
					width: "100%",
					background: "rgba(218, 179, 44, 0.15)",
					padding: "5px",
					maxWidth: "100%",
					minWidth: "100%",
					minHeight: "130px",
					maxHeight: "400px",
					outline: "none",
					border: "none",
					"&::placeholder": {
						color: "#DAB32C",
					},
				},
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

const HeadManager = styled.div(({ theme: { flex, $black } }) => {
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
			"> span": { color: $black, fontSize: "16px" },
			"> * ": {
				margin: "0 7px",
			},
		},
	};
});

export const LeftAside = styled.aside(({ theme: { flex, $white }, extraStyles }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		flexDirection: "column",
		width: "400px",
		height: "100%",
		borderRight: "1px solid #E4EAF0",
		backgroundColor: $white,
		...extraStyles,
	};
});

const noTask = (
	<LeftAside
		extraStyles={{
			height: "100vh",
			"> h3": {
				height: "10%",
				textAlign: "center",
				margin: "auto",
			},
		}}
	>
		<h3>هیچ تسکی برای نمایش انتخاب نشده است</h3>
	</LeftAside>
);
