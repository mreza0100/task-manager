import {
	flex,
	butyInputs,
	prevEnter,
	changeDateFormat,
	tagObjToArr,
	tagArrToObj,
	editDate,
} from "../helpers/exports";
import { getOneAndOverwrite, getOneFromState } from "../redux/actions/tasks";
import { _USE_API_, APITools } from "../api/index.API";
import ReactTags from "react-tag-autocomplete";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment-jalaali";
import DatePicker from "../proxy";
import Router from "next/router";
import * as yup from "yup";
// !>>
export const validation = yup.object({
	title: yup.string().required().trim(),
	description: yup.string().trim(),
});

async function handleSubmit(data, { dispatch }) {
	try {
		const { id: taskID } = data;
		const res = await _USE_API_({
			isPrivetRoute: true,
			pendingID: taskID,
			describe: "saving TaskManaged changes",
		}).Put({
			url: "tasks",
			data,
		});
		if (res.status === 200) dispatch(getOneAndOverwrite({ taskID }));
	} catch (err) {
		console.dir(err);
	}
}

async function handleDeleteTask(taskID) {
	try {
		const res = await _USE_API_({
			isPrivetRoute: true,
			pendingID: taskID,
			describe: "deleting a task",
		}).Delete({ data: { id: taskID }, url: "/tasks" });
		if (res.status === 200) Router.replace("/");
	} catch (err) {
		console.dir(err);
	}
}

function handleCancel(taskID) {
	if (APITools.checkInPendingList(taskID))
		Router.replace("/", undefined, { shallow: true });
}

export default function TaskManager({ taskID }) {
	const dispatch = useDispatch();
	const {
		title: initialTitle,
		description: initialDescription,
		color: initialColor,
		tags: initalTags,
		from_date: initaialFromDate,
		to_date: initaialToDate,
	} = dispatch(getOneFromState({ taskID }));

	// hooks
	const [fromDate, setFromDate] = useState(moment(editDate(initaialFromDate)));
	const [toDate, setToDate] = useState(moment(editDate(initaialToDate)));
	const [tags, setTags] = useState(tagArrToObj(initalTags));

	// functions
	const handleAddition = tag => setTags([...tags, tag]);
	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));
	const onColorCahnge = ({ target: { value } }) => {
		document.querySelector(`li[target='${taskID}']`).style.backgroundColor = value;
	};

	useEffect(() => {
		return () => {
			try {
				document.querySelector(`li[target='${taskID}']`).removeAttribute("style");
			} catch (err) {}
		};
	}, []);
	return (
		<Formik
			validationSchema={validation}
			initialValues={{
				title: initialTitle,
				description: initialDescription,
				color: initialColor,
			}}
			onSubmit={({ title, color, description }, { setSubmitting }) => {
				setSubmitting(true);
				const sortedData = {
					title,
					color,
					description,
					tags: tagObjToArr(tags),
					from_date: changeDateFormat(fromDate),
					to_date: changeDateFormat(toDate),
					id: taskID,
				};
				handleSubmit(sortedData, { dispatch }).finally(() => setSubmitting(false));
			}}
			enableReinitialize
		>
			{({ isSubmitting }) => {
				return (
					<Form
						className={`container formik-form ${isSubmitting ? "disable-all" : ""}`}
						onKeyDown={prevEnter}
					>
						<div className="title-color col-md-12 row">
							<Field
								type="text"
								placeholder="سر تیتر"
								name="title"
								className="col-11"
							/>
							<Field
								onInput={onColorCahnge}
								type="color"
								name="color"
								className="col-1"
							/>
						</div>
						<Field as="textarea" name="description" placeholder="توضیحات" rows="4" />
						<StyledDatePickers className="col-md-12">
							<div>
								از تاریخ:
								<DatePicker
									className="d-block m-auto w-100 cursor-pointer"
									isGregorian={false}
									onChange={val => setFromDate(val)}
									value={fromDate}
								/>
							</div>
							<div>
								تا تاریخ:
								<DatePicker
									className="d-block m-auto w-100 cursor-pointer"
									isGregorian={false}
									onChange={val => setToDate(val)}
									value={toDate}
								/>
							</div>
						</StyledDatePickers>
						<ReactTags
							tags={tags}
							handleAddition={handleAddition}
							handleDelete={handleDelete}
							placeholder="اضافه کردن تگ(با کلید Enter)"
							minQueryLength={1}
							autoresize={false}
							allowNew={true}
						/>
						<Btns className="row w-100">
							<button
								className="btn btn-danger col-sm-1"
								onClick={() => handleDeleteTask(taskID)}
								type="button"
							>
								حذف <i className="fa fa-trash" />
							</button>
							<button
								className="btn btn-warning col-sm-1"
								onClick={() => handleCancel(taskID)}
								type="button"
							>
								لغو <i className="fa fa-times" />
							</button>
							<button className="btn btn-success col-sm-1" type="submit">
								ثبت <i className="fa fa-save" />
							</button>
						</Btns>
					</Form>
				);
			}}
		</Formik>
	);
}

const Btns = styled.div(props => {
	return {
		justifyContent: "flex-end",
		width: "100%",
		height: "auto",
		"> button": {
			padding: "5px",
			margin: "0 20px",
		},
	};
});

// const StyledTaskManager = styled.div(({}) => {
// return {
// 	...flex(),
// 	...transition(1.5),
// 	flexDirection: "column",
// 	width: "100%",
// 	height: "auto",
// 	padding: "20px 0",
// 	backgroundColor: "#28596157",
// 	overflow: "hidden",
// 	bottom: "8px",
// 	position: "relative",
// 	...formikStyles,
// };
// });

export const formikStyles = {
	"> .formik-form": {
		...butyInputs,
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		minHeight: "400px",
		"> textarea": { width: "100%" },
		"> .title-color": {
			...flex(),
			"input[type=color]": {
				padding: 0,
				margin: 0,
			},
		},
	},
};

export const StyledDatePickers = styled.div(({}) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		"> div": {
			...flex(["justifyContent", "alignItems"]),
			justifyContent: "space-between",
			alignItems: "flex-start",
			flexDirection: "column",
			"> div": { paddingTop: "5px" },
		},
	};
});
