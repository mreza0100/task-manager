import {
	flex,
	prevEnter,
	changeDateFormat,
	tagObjToArr,
	tagArrToObj,
	editDate,
} from "../helpers/exports";
import { formikStyles, StyledDatePickers } from "../components/TaskManager";
import Task, { StyledCheckbox, StyledStar } from "../components/Task";
import { getProfileAndTasks } from "../redux/actions/profile";
import { getOneAndOverwrite } from "../redux/actions/tasks";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import ReactTags from "react-tag-autocomplete";
import MainLauout from "../layout/Main.lauout";
import { _USE_API_ } from "../api/index.API";
import { Formik, Form, Field } from "formik";
import { searchData } from "../search-data";
import { wrapper } from "../redux/store";
import moment from "moment-jalaali";
import DatePicker from "../proxy";
import { useState } from "react";
import Router from "next/router";
import * as yup from "yup";

export const validation = yup.object({
	title: yup.string().trim(),
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

function goToTask({ target }) {
	const id = target.getAttribute("target");
	if (target.nodeName !== "LI" /*and has target att*/ || !id) return;
	Router.push(`/?id=${id}`);
}

export default function Search(props) {
	// hooks
	const [fromDate, setFromDate] = useState(moment());
	const [toDate, setToDate] = useState(moment());
	const [tags, setTags] = useState([]);
	const [isDone, setIsDone] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const tasks = useSelector(state => state.tasks);
	const { classes, figure } = useTheme().TF;
	const dispatch = useDispatch();

	// functions
	const handleAddition = tag => setTags([...tags, tag]);
	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));

	return (
		<MainLauout>
			<StyledSavesSearches className="row">
				<StyledSearchWrapper className="col-sm-5 row">
					{searchData.map(({ name }, idx) => {
						return (
							<StyledSearch className="col-12 row" key={idx}>
								<span className="col-8">{name}</span>
								<button className="btn btn-danger col-3">
									حذف جستجو
									<i className="fa fa-trash" />
								</button>
							</StyledSearch>
						);
					})}
				</StyledSearchWrapper>
				<Formik
					enableReinitialize
					validationSchema={validation}
					initialValues={{
						title: "",
						description: "",
						color: "",
					}}
					onSubmit={({ title, color, description }, { setSubmitting }) => {
						const sortedData = {
							title,
							color,
							description,
							tags: tagObjToArr(tags),
							from_date: changeDateFormat(fromDate),
							to_date: changeDateFormat(toDate),
						};
						handleSubmit(sortedData, { dispatch, setSubmitting });
					}}
				>
					{({ isSubmitting, setSubmitting }) => {
						return (
							<Form
								className="formik-form col-sm-5"
								onKeyDown={prevEnter}
							>
								<div className="title-color col-12 row">
									<Field
										className="col-sm-8"
										type="text"
										placeholder="سر تیتر"
										name="title"
									/>
									<div className="col-sm-4 d-flex justify-content-evenly">
										<StyledCheckbox
											opacity={isDone ? 1 : 0}
											onClick={() => setIsDone(!isDone)}
										>
											<i className="fa fa-check" />
										</StyledCheckbox>
										<StyledStar
											starColor={
												isFavorite
													? "#b7ff07"
													: "unset"
											}
											onClick={() =>
												setIsFavorite(!isFavorite)
											}
										>
											<i className="fa fa-star" />
										</StyledStar>
									</div>
								</div>
								<Field
									as="textarea"
									name="description"
									placeholder="توضیحات"
									rows="4"
								/>
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
									placeholderText="اضافه کردن تگ(با کلید Enter)"
									minQueryLength={1}
									autoresize={false}
									allowNew
								/>
								<button className="btn btn-success mr-auto pr-4 pl-4">
									جستجو <i className="fa fa-search pr-1" />
								</button>
							</Form>
						);
					}}
				</Formik>
			</StyledSavesSearches>

			<StyledUl className={classes.ul} onClick={goToTask}>
				{tasks.map(task => {
					return <Task taskData={task} key={task.id} />;
				})}
			</StyledUl>
		</MainLauout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store: { dispatch }, req, res }) => {
		await dispatch(getProfileAndTasks({ req, res }));
	},
);

const StyledSearch = styled.div(props => {
	return {
		direction: "rtl",
		justifyContent: "space-between",
		marginBottom: "10px",
		height: "10%",
		padding: 0,
		userSelect: "none",
		"> span": {
			...flex(["justifyContent"]),
			justifyContent: "flex-start",
			backgroundColor: "#76ad32",
			padding: "10px 10px",
			cursor: "pointer",
			borderRadius: "5px",
			"&:hover": {
				opacity: "0.9",
			},
		},
		"> button": {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			padding: 5,
		},
	};
});

const StyledUl = styled.ul(({ theme }) => {
	const general = {};
	switch (theme.TF.figure) {
		case "line":
			return { ...general, ...flex() };
		case "table":
			return {
				...general,
				...flex(),
				width: "100%",
				minHeight: "100px",
				flexWrap: "wrap",
			};
	}
});

const StyledSearchWrapper = styled.div(props => {
	return {
		height: "min-content",
		overflow: "auto",
		height: "400px",
		direction: "ltr",
	};
});

const StyledSavesSearches = styled.div(props => {
	return {
		justifyContent: "space-evenly",
		margin: "50px 0 100px 0",
		form: { background: "#a72a5a" },
		...formikStyles,
	};
});
