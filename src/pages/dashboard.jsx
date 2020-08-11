import { flex, butyInputs, changeDateFormat, tagObjToArr } from "../helpers/exports";
import MainLayout from "../layout/Main.lauout";
import ReactTags from "react-tag-autocomplete";
import { _USE_API_ } from "../api/index.API";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment-jalaali";
import DatePicker from "../proxy";
import * as yup from "yup";

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

const validation = yup.object({
	searchName: yup.string().required().trim(),
	amount: yup.number(),
});
const initialValues = {
	searchName: "test",
	amount: 0,
};

export default function Dashboard({}) {
	// hooks
	const [typeTime, setTypeTime] = useState(null); // pass, now, future
	const [from, setFrom] = useState("now"); // if === "now" {"now"} else === "custom" then fromDate must be selected
	const [fromDate, setFromDate] = useState(moment());
	const [typeDate, setTypeDate] = useState(null); // from_date, to_date
	const [tags, setTags] = useState([]);

	//functions
	const handleAddition = tag => setTags([...tags, tag]);
	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));
	const onSubmit = data => {
		const _tags = tagObjToArr(tags);
		if (typeTime === "now") {
			delete data.amount;
			var sortedData = {
				type_date: typeDate,
				tags: _tags,
				...data,
			};
		} else {
			var sortedData = {
				...data,
				tags: _tags,
				time: from === "now" ? "now" : changeDateFormat(fromDate),
				type_date: typeDate,
			};
		}
		console.log(sortedData);
	};

	return (
		<MainLayout>
			<StyledManager className="bg-secondary container" typeTime={typeTime}>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
					{({}) => {
						return (
							<Form className="w-75 formik-form">
								<Field placeholder="نام جست و جو" type="text" name="searchName" />
								<StyledTypeDate id="#type_time">
									<h6>انتخاب بازه زمانی</h6>
									<ul className="container row justify-constent-evenly w-100">
										{typeDateData.map(({ text, type, className: c }) => {
											return (
												<StyledTypeDateLi
													className={c}
													onClick={() => setTypeTime(type)}
													selectedMe={type === typeTime}
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
	return {
		...flex(),
		height: "max-content",
		padding: "20px 0",
		color: "#fff",
		".react-tags__search-wrapper > input": {
			padding: "5px 8px",
		},
		".color-red": {
			color: "red",
		},
		h6: { fontSize: 18 },
		"#type_time": {},
		"#amount": {
			...(typeTime === "now" ? notAllowed : {}),
			...flex(["justifyContent"]),
			justifyContent: "space-evenly",
		},
		"#from": {
			...(typeTime === "now" ? notAllowed : {}),
			span: {
				cursor: "pointer",
			},
			".datepicker-input": {},
		},
		"#type_date": {
			...(typeTime === "now" ? notAllowed : {}),
			span: {
				cursor: "pointer",
			},
		},
	};
});
