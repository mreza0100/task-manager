import {
	transition,
	flex,
	prevEnter,
	changeDateFormat,
	tagObjToArr,
	getRandomColor,
} from "../helpers/exports";
import { StyledDatePickers, validation } from "./TaskManager";
import { togglePluse } from "../redux/actions/pluse";
import { getOneTask } from "../redux/actions/tasks";
import ReactTags from "react-tag-autocomplete";
import PluseBtn from "../components/PluseBtn";
import { _USE_API_ } from "../api/index.API";
import { formikStyles } from "./TaskManager";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment-jalaali";
import DatePicker from "../proxy";
// !>>

async function handleSubmit(data) {
	return await _USE_API_({ isPrivetRoute: true, describe: "PluseWindow" })
		.Post({
			url: "tasks",
			data,
		})
		.then(res => {
			return res.data.data.item./* taskID=>*/ id;
		})
		.catch(err => {
			console.dir(err);
			return false;
		});
}

export default function PluseWindow({ hasPluseBtn }) {
	const [initialColor, setInitialColor] = useState(getRandomColor());
	const [firstDate, setFirstDate] = useState(moment());
	const [secondDate, setSecDate] = useState(moment());
	const [tags, setTags] = useState([]);
	const dispatch = useDispatch();

	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));
	const closeOnEscape = ({ which }) => which === 27 && dispatch(togglePluse());
	const handleAddition = tag => setTags([...tags, tag]);

	useEffect(() => {
		addEventListener("keydown", closeOnEscape);
		return () => {
			removeEventListener("keydown", closeOnEscape);
		};
	}, []);

	return (
		<StyledTaskManager>
			{hasPluseBtn && <PluseBtn extraClass="align-self-start mr-4" />}
			<Formik
				enableReinitialize
				validationSchema={validation}
				initialValues={{
					title: "a",
					description: "",
					color: initialColor,
				}}
				onSubmit={({ title, color, description }, { setSubmitting }) => {
					setSubmitting(true);
					const sortedData = {
						title,
						color,
						description,
						tags: tagObjToArr(tags),
						from_date: changeDateFormat(firstDate),
						to_date: changeDateFormat(secondDate),
					};
					handleSubmit(sortedData)
						.then(taskID => {
							if (taskID) dispatch(getOneTask({ taskID }));
							setInitialColor(getRandomColor());
							/*if taskID in res from server was not empty alright*/
						})
						.finally(() => setSubmitting(false));
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
							placeholder="اضافه کردن تگ(با کلید Enter)"
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
	);
}

const StyledTaskManager = styled.div(({}) => {
	return {
		...flex(),
		flexDirection: "column",
		width: "100%",
		height: "auto",
		...transition(1.5),
		...formikStyles,
	};
});
