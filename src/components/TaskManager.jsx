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
import { _USE_API_ } from "../api/index.API";
import ReactTags from "react-tag-autocomplete";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";
import moment from "moment-jalaali";
import DatePicker from "../proxy";
import Router from "next/router";
import * as yup from "yup";

export const validation = yup.object({
	title: yup.string().required().trim(),
	description: yup.string().trim(),
});

async function handleSubmit(data, { dispatch, setSubmitting }) {
	setSubmitting(true);
	try {
		const { id: taskID } = data;
		const res = await _USE_API_({
			isPrivetRoute: true,
			pendingID: taskID,
			describe: "saving TaskManager changes",
		}).Put({
			url: "tasks",
			data,
		});
		if (res.status === 200) dispatch(getOneAndOverwrite({ taskID }));
	} catch (err) {
		console.dir(err);
	} finally {
		setSubmitting(false);
	}
}

async function handleDeleteTask(taskID, { setSubmitting }) {
	setSubmitting(true);
	try {
		const res = await _USE_API_({
			isPrivetRoute: true,
			pendingID: taskID,
			describe: "deleting a task",
		}).Delete({ data: { id: taskID }, url: "/tasks" });
		if (res.status === 200) Router.replace("/");
	} catch (err) {
		console.dir(err);
		setSubmitting(false);
	}
}

function handleCancel() {
	Router.replace("/", undefined, { shallow: true });
}

export default function TaskManager({ taskID }) {
	const dispatch = useDispatch();
	const taskData = dispatch(getOneFromState({ taskID }));
	if (!taskData) return null;

	const {
		title: initialTitle,
		description: initialDescription,
		color: initialColor,
		tags: initalTags,
		from_date: initaialFromDate,
		to_date: initaialToDate,
	} = taskData;
	// hooks
	const [fromDate, setFromDate] = useState(moment(editDate(initaialFromDate)));
	const [toDate, setToDate] = useState(moment(editDate(initaialToDate)));
	const [tags, setTags] = useState(tagArrToObj(initalTags));
	const { figure } = useTheme().TF;

	// functions
	const handleAddition = tag => setTags([...tags, tag]);
	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));
	const onColorCahnge = ({ target: { value } }) => {
		document.querySelector(
			`li[target='${taskID}'] span + span`
		).style.backgroundImage = `linear-gradient(90deg, ${value}, transparent)`;
	};

	useEffect(() => {
		return () => {
			try {
				document.querySelector(`li[target='${taskID}'] span + span`).removeAttribute("style");
			} catch (err) {}
		};
	}, []);

	return (
		<Formik
			enableReinitialize
			validationSchema={validation}
			initialValues={{
				title: initialTitle,
				description: initialDescription,
				color: initialColor,
			}}
			onSubmit={({ title, color, description }, { setSubmitting }) => {
				const sortedData = {
					title,
					color,
					description,
					tags: tagObjToArr(tags),
					from_date: changeDateFormat(fromDate),
					to_date: changeDateFormat(toDate),
					id: taskID,
				};
				handleSubmit(sortedData, { dispatch, setSubmitting });
			}}
		>
			{({ isSubmitting, setSubmitting }) => {
				return (
					<Form className="container formik-form" onKeyDown={prevEnter}>
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
							onAddition={handleAddition}
							onDelete={handleDelete}
							placeholder="اضافه کردن تگ(با کلید Enter)"
							minQueryLength={1}
							autoresize={false}
							allowNew
						/>
						<Btns className="row w-100">
							<button
								className="btn btn-danger col-sm-1"
								onClick={() => handleDeleteTask(taskID, { setSubmitting })}
								type="button"
								disabled={isSubmitting}
							>
								حذف <i className="fa fa-trash" />
							</button>
							<button
								className="btn btn-secondary col-sm-1"
								onClick={handleCancel}
								type="button"
								disabled={isSubmitting}
							>
								لغو <i className="fa fa-times" />
							</button>
							<button
								className="btn btn-success col-sm-1"
								type="submit"
								disabled={isSubmitting}
							>
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
