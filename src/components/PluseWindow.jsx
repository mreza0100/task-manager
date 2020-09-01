import { transition, flex, prevEnter, tagObjToArr, stringfyDateForServer } from "../helpers/exports";
import DatePicker from "../../node_modules/react-datepicker2/dist/es/index";
import { useDispatch, useSelector } from "react-redux";
import { getOneTask } from "../redux/actions/tasks";
import { togglePlus } from "../redux/actions/plus";
import ReactTags from "react-tag-autocomplete";
import { _USE_API_ } from "../api/index.API";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment-jalaali";
// !>>

async function handleSubmit(data, { dispatch, setSubmitting }) {
	setSubmitting(true);
	await _USE_API_({ isPrivetRoute: true, describe: "PluseWindow" })
		.Post({
			url: "tasks",
			data,
		})
		.then(res => {
			const taskID = res.data.data.item.id;
			if (taskID) dispatch(getOneTask({ taskID }));
		})
		.catch(err => {
			console.dir(err);
		})
		.finally(() => {
			setSubmitting(false);
		});
}

export default function PluseWindow() {
	const [firstDate, setFirstDate] = useState(moment());
	const [secondDate, setSecDate] = useState(moment());
	const [tags, setTags] = useState([]);
	const dispatch = useDispatch();

	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));
	// const closeOnEscape = ({ which }) => which === 27 && dispatch(togglePlus());
	const handleAddition = tag => setTags([...tags, tag]);

	const isPlusMode = useSelector(state => state.isPlusMode);

	if (!isPlusMode) return <TransitonWrapper visible={false} />;
	return (
		<TransitonWrapper visible={true}>
			<StyledTaskManager>
				<Formik
					enableReinitialize
					// validationSchema={}
					initialValues={{
						title: "a",
						description: "",
						color: "#454F4F",
					}}
					onSubmit={({ title, color, description }, { setSubmitting }) => {
						const sortedData = {
							title,
							color,
							description,
							tags: tagObjToArr(tags),
							from_date: stringfyDateForServer(firstDate),
							to_date: stringfyDateForServer(secondDate),
						};
						handleSubmit(sortedData, { dispatch, setSubmitting });
					}}
				>
					{({ isSubmitting }) => (
						<Form className="container formik-form" onKeyDown={prevEnter}>
							<div className="title-color col-md-12 row">
								<Field
									type="text"
									placeholder="سر تیتر"
									name="title"
									className="col-11"
								/>
								<Field type="color" name="color" className="col-1" />
							</div>
							<Field
								as="textarea"
								name="description"
								placeholder="توضیحات"
								rows="4"
							/>
							<StyledDatePickers className="col-12">
								<div>
									<span>از تاریخ:</span>
									<DatePicker
										className="d-block m-auto w-100 cursor-pointer"
										isGregorian={false}
										onChange={val => setFirstDate(val)}
										value={firstDate}
									/>
								</div>
								<div>
									<span>تا تاریخ:</span>
									<DatePicker
										className="d-block m-auto w-100 cursor-pointer"
										isGregorian={false}
										onChange={val => setSecDate(val)}
										value={secondDate}
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
							<button
								type="submit"
								className="btn btn-primary align-self-end pr-5 pl-5"
								disabled={isSubmitting}
							>
								ثبت
							</button>
						</Form>
					)}
				</Formik>
			</StyledTaskManager>
		</TransitonWrapper>
	);
}

const StyledDatePickers = styled.div(() => {
	return {};
});

const TransitonWrapper = styled.div(({ theme: { flex }, visible: v }) => {
	return {
		transition: "all 0.3s",
		position: "fixed",
		bottom: v ? "0%" : "-80%",
		right: "10%",
		width: "35%",
		minHeight: "450px",
		padding: "15px 0",
		opacity: v ? 1 : 0,
		pointerEvents: v ? "unset" : "none",
		borderRadius: "10px 10px 0px 0px",
		backgroundColor: "#286B89",
	};
});

const StyledTaskManager = styled.div(({}) => {
	return {
		...flex(),
		flexDirection: "column",
		width: "100%",
		height: "auto",
		...transition(1.5),
	};
});
