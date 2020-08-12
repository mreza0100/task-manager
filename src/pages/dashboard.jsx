import { flex, changeDateFormat, tagObjToArr, reloadRouter } from "../helpers/exports";
import MainLayout from "../layout/Main.lauout";
import ReactTags from "react-tag-autocomplete";
import { _USE_API_ } from "../api/index.API";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import moment from "moment-jalaali";
import DatePicker from "../proxy";
import { useState } from "react";
import * as yup from "yup";
// TODO: clean this shiti mess after all :(
async function handleSubmit(data) {
	try {
		const res = await _USE_API_({ describe: "save a task query", isPrivetRoute: true, debug: true }).Post({
			data,
			url: "/save_task_query",
		});
		if (res.status === 200 && res.data.data.item.id) reloadRouter();
	} catch (err) {
		console.dir(err);
	}
}

const typeDateData = [
	{
		text: "گذشته",
		type: "pass",
		className: "col-1",
	},
	{
		text: "حال",
		type: "now",
		className: "col-1",
	},
	{
		text: "آینده",
		type: "future",
		className: "col-1",
	},
];

const normalValidation = yup.object({
	name: yup.string().required().trim(),
	amount: yup.number().required().min(1),
});
const specialValidation = yup.object({
	name: yup.string().required().trim(),
});
const initialValues = {
	name: "test",
	amount: 1,
};

export default function Dashboard({}) {
	// hooks
	const [time, setTime] = useState("future"); // pass, now, future
	const [from, setFrom] = useState("now"); // if === "now" {"now"} else === "custom" then fromDate must be selected
	const [fromDate, setFromDate] = useState(moment()); // if from !== "now" this must be selected and send for server
	const [typeDate, setTypeDate] = useState("from_date"); // from_date, to_date
	const [tags, setTags] = useState([]);

	//functions
	const handleAddition = tag => setTags([...tags, tag]);
	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));
	const onSubmit = data => {
		if (time === "now") {
			const name = data.name;
			var sortedData = {
				time,
				tags: tagObjToArr(tags),
				name,
			};
		} else {
			var sortedData = {
				time,
				tags: tagObjToArr(tags),
				from: from === "now" ? "now" : changeDateFormat(fromDate),
				type_date: typeDate,
				...data,
			};
		}
		handleSubmit(sortedData);
	};
	return (
		<MainLayout>
			<StyledManager className="bg-secondary container" typeTime={time}>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={time === "now" ? specialValidation : normalValidation}
				>
					{({ errors, values }) => {
						console.log(values);
						return (
							<Form className="w-75 formik-form">
								<Field placeholder="نام جست و جو" type="text" name="name" />
								<StyledTypeDate id="#type_time">
									<h6>انتخاب بازه زمانی</h6>
									<ul className="container row justify-constent-evenly w-100">
										{typeDateData.map(({ text, type, className: c }) => {
											return (
												<StyledTypeDateLi
													className={c}
													onClick={() => setTime(type)}
													selectedMe={type === time}
													key={text}
												>
													{text}
												</StyledTypeDateLi>
											);
										})}
									</ul>
								</StyledTypeDate>
								<div id="amount" className="row">
									<span className="col-2">میزان (روز):</span>
									<Field className="col-8" type="number" name="amount" />
								</div>
								<div id="from" className="row justify-content-evenly">
									<h6 className="col-12 text-center mt-2 mb-2">انتخاب زمان</h6>
									<span
										className={`col-2 text-center ${
											from === "now" ? "color-red" : ""
										}`}
										onClick={() => setFrom("now")}
									>
										از زمان حال
									</span>
									<span
										className={`col-2 text-center ${
											from === "custom" ? "color-red" : ""
										}`}
										onClick={() => setFrom("custom")}
									>
										تنظیم دقیق زمان
									</span>
									{from === "custom" && (
										<div className="col-12 row justify-content-center">
											{/* <h6 className="col-3 flex">از تاریخ:</h6> */}
											<DatePicker
												className="cursor-pointer"
												isGregorian={false}
												onChange={val => setFromDate(val)}
												value={fromDate}
											/>
										</div>
									)}
								</div>
								<div id="type_date" className="row mb-2 justify-content-evenly">
									<h6 className="col-12 mt-2 flex">
										انتخاب شروع یا پایان تسک
									</h6>
									<span
										className={`col-2 flex ${
											typeDate === "from_date" ? "color-red" : ""
										}`}
										onClick={() => setTypeDate("from_date")}
									>
										زمان شروع
									</span>
									<span
										className={`col-2 flex ${
											typeDate === "to_date" ? "color-red" : ""
										}`}
										onClick={() => setTypeDate("to_date")}
									>
										زمان پایان
									</span>
								</div>
								<ReactTags
									tags={tags}
									onAddition={handleAddition}
									onDelete={handleDelete}
									placeholderText="اضافه کردن تگ(با کلید Enter)"
									minQueryLength={1}
									autoresize={false}
									allowNew
								/>
								<button className="btn btn-success" type="submit">
									ثبت
								</button>
							</Form>
						);
					}}
				</Formik>
			</StyledManager>
		</MainLayout>
	);
}
Dashboard.getInitialProps = async ctx => {};

const StyledTypeDateLi = styled.li(({ selectedMe }) => {
	return {
		color: selectedMe ? "red" : "unset",
		cursor: "pointer",
		transition: "0.3s all",
		textAlign: "center",
		"&:hover": { color: "red" },
	};
});

const StyledTypeDate = styled.div(props => {
	return {
		...flex(),
		flexDirection: "column",
	};
});

const notAllowed = {
	"*": {
		userSelect: "none",
		cursor: "default !important",
		pointerEvents: "none",
		opacity: 0.6,
	},
};

const StyledManager = styled.div(({ typeTime }) => {
	const denied = typeTime === "now" ? notAllowed : {};
	return {
		...flex(),
		height: "max-content",
		padding: "20px 0",
		color: "#fff",
		".color-red": {
			color: "red",
		},
		h6: { fontSize: 18 },
		"#type_time": {},
		"#amount": {
			...denied,
			...flex(["justifyContent"]),
			justifyContent: "space-evenly",
		},
		"#from": {
			...denied,
			span: {
				cursor: "pointer",
			},
			".datepicker-input": {},
		},
		"#type_date": {
			...denied,
			span: {
				cursor: "pointer",
			},
		},
	};
});
