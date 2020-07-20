import { flex, $, phoneRegExp, transition, butyInputs } from "../helpers/exports";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { _USE_API_ } from "../api/index.API";
import * as yup from "yup";
import Router from "next/router";

export const C = {
	FieldContainer: "row w-100 justify-content-center",
	Form: "container d-flex flex-column align-items-center",
	btnSubmit: "btn btn-outline-secondary mt-4 pr-5 pl-5",
};

export const __dataInputs__ = [
	{ name: "name", label: "نام", type: "text" },
	{ name: "family", label: "نام خانوادگی", type: "text" },
	{ name: "mobile", label: "شماره همراه", type: "text" },
	{ name: "email", label: "ایمیل", type: "email" },
	{ name: "pass", label: "پسورد", type: "password" },
	{ name: "pass2", label: "تکرار پسورد", type: "password" },
];

const initialValues = {
	name: "",
	family: "",
	mobile: "",
	email: "",
	pass: "",
	pass2: "",
};
export const validation = yup.object({
	name: yup.string().trim().required(),
	family: yup.string().trim().required(),
	mobile: yup
		.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.min(11)
		.max(11)
		.trim()
		.required(),
	email: yup.string().email().trim(),
	pass: yup.string().trim().min(8).max(32).required(),
	pass2: yup
		.string()
		.oneOf([yup.ref("pass"), null], "Passwords must match")
		.required(),
});

async function handleSubmit(data) {
	const res = await _USE_API_({
		describe: "register user account",
	}).Post({
		url: "register",
		data,
	});
	if (res.status === 200) Router.push({ pathname: "/confirm" });
}

export default function register(props) {
	// TODO: make a nice layout for register login and etc (register => confirm => login)
	return (
		<StyledMain>
			<Formik
				initialValues={initialValues}
				onSubmit={({ name, family, mobile, email, pass: password }) => {
					// ? sorting data for calling handle submit
					const sortedData = { name, family, mobile, email, password };
					handleSubmit(sortedData);
				}}
				validationSchema={validation}
			>
				{({ errors, touched }) => {
					return (
						<Form className={C.Form}>
							{__dataInputs__.map(({ name, label, type }) => {
								const error = touched[name] && errors[name];
								return (
									<FieldContainerTag key={name} className={C.FieldContainer}>
										<Label err={error}>{error ?? label} :</Label>
										<Field name={name} type={type} />
									</FieldContainerTag>
								);
							})}
							<button type="submit" className={C.button}>
								عضویت
							</button>
						</Form>
					);
				}}
			</Formik>
		</StyledMain>
	);
}

const StyledMain = styled.main(props => {
	return {};
});

export const Label = styled.label(({ err }) => {
	const color = err ? "red" : "black";
	return {
		color,
		...transition(0.2),
		fontSize: "18px",
		marginTop: "35px",
		marginBottom: "15px",
	};
});

export const FieldContainerTag = styled.div(props => {
	return {
		...flex(),
		flexDirection: "column",
		width: `45% ${$}`,
		color: "black",
		...butyInputs,
	};
});
