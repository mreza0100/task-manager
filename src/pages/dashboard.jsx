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
import styled from "styled-components";
import moment from "moment-jalaali";
import DatePicker from "../proxy";
import Router from "next/router";
import * as yup from "yup";

const validation = yup.object({
	searchName: yup.string().required().trim(),
	"???": yup.string().trim(),
	"???": yup.string().trim(),
});

const initialValues = {};

export default function Dashboard(props) {
	// hooks
	const [tags, setTags] = useState([]);

	//functions
	const handleAddition = tag => setTags([...tags, tag]);
	const handleDelete = idx1 => setTags(tags.filter((i, idx2) => idx1 !== idx2));

	return (
		<StyledManager>
			<Formik initialValues={initialValues} onSubmit={data => {}} validationSchema={validation}>
				{({ errors }) => {
					return (
						<Form className="container formik-form">
							<Field placeholder="نام جست و جو" type="text" name="searchName" />
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
	);
}
Dashboard.getInitialProps = async ctx => {};
const StyledManager = styled.div(props => {
	return {
		width: "60%",
		margin: "auto",
		height: "max-content",
		padding: "20px 0",
		backgroundColor: "#1d1925a8",
	};
});
