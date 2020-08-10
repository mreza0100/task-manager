import {
	flex,
	butyInputs,
	prevEnter,
	changeDateFormat,
	tagObjToArr,
	tagArrToObj,
	editDate,
} from "../helpers/exports";
import MainLayout from "../layout/Main.lauout";
import ReactTags from "react-tag-autocomplete";
import { _USE_API_ } from "../api/index.API";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
	{
		text: "انتخاب تاریخ دقیق",
		type: "custom",
		className: "col-3",
	},
];

const validation = yup.object({
	searchName: yup.string().required().trim(),
});
const initialValues = {};

export default function Dashboard({}) {
	// hooks
	const [tags, setTags] = useState([]);
	const [typeDate, setTypeDate] = useState(false); // from_date, to_date
	const [amount, setAmount] = useState(0); // amount: number of days
	const [typeTime, setTypeTime] = useState(false); // pass, now, future, date input

	//functions
	const handleAddition = tag => setTags([...tags, tag]);
	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));
	console.log(typeDate);
	return (
		<MainLayout>
			<StyledManager className="container">
				<Formik initialValues={initialValues} onSubmit={data => {}} validationSchema={validation}>
					{({}) => {
						return (
							<Form className="w-75 formik-form">
								<Field placeholder="نام جست و جو" type="text" name="searchName" />
								<StyledTypeDate>
									<span id="title">انتخاب بازه زمانی</span>
									<ul
										id="selector"
										className="container row justify-constent-evenly"
									>
										{typeDateData.map(({ text, type, className: c }) => {
											return (
												<StyledTypeDateLi
													className={c}
													onClick={() => setTypeDate(type)}
													selectedMe={type === typeDate}
												>
													{text}
												</StyledTypeDateLi>
											);
										})}
									</ul>
								</StyledTypeDate>
								<ReactTags
									tags={tags}
									onAddition={handleAddition}
									onDelete={handleDelete}
									placeholderText="اضافه کردن تگ(با کلید Enter)"
									minQueryLength={1}
									autoresize={false}
									allowNew
								/>
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
		"span#title": { fontSize: 18, width: "fit-content" },
		"> div#selector": {
			width: "100%",
		},
	};
});

const StyledManager = styled.div(props => {
	return {
		...flex(),
		height: "max-content",
		padding: "20px 0",
		backgroundColor: "#1d1925a8",
		".react-tags__search-wrapper > input": {
			padding: "5px 8px",
		},
	};
});
