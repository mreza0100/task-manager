import { flex, $, phoneRegExp, transition, butyInputs, isUndefined } from "../../helpers/exports";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { _USE_API_ } from "../../api/index.API";
import * as yup from "yup";
import Router from "next/router";
import RegisterProgress from "../../layout/RegisterProgress.layout";
import showMsg from "../../helpers/alerts/msg";

export const C = {
	FieldContainer: "row w-100 justify-content-center",
	Form: "container d-flex flex-column align-items-center",
	btnSubmit: "btn btn-outline-secondary mt-4 pr-5 pl-5",
};

export const dataInputs = [
	{ name: "name", label: "نام", type: "text", auto: "off" },
	{ name: "family", label: "نام خانوادگی", type: "text", auto: "off" },
	{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" },
	{ name: "email", label: "ایمیل", type: "email", auto: "on" },
	{ name: "pass", label: "پسورد", type: "password", auto: "off" },
	{ name: "pass2", label: "تکرار پسورد", type: "password", auto: "off" },
];

const initialValues = {
	name: "",
	family: "",
	mobile: "",
	email: "",
	pass: "",
	pass2: "",
};
const validation = yup.object({
	name: yup.string().trim().required(),
	family: yup.string().trim().required(),
	mobile: yup.string().matches(phoneRegExp, "Phone number is not valid").min(11).max(11).trim().required(),
	email: yup.string().email().trim(),
	pass: yup.string().trim().min(8).max(32).required(),
	pass2: yup
		.string()
		.oneOf([yup.ref("pass"), null], "Passwords must match")
		.required(),
});

async function handleSubmit(data) {
	try {
		const res = await _USE_API_({
			ignoreStatuses: [401],
			describe: "register user account",
		}).Post({
			url: "register",
			data,
		});
		if (res.status === 200) Router.push("/register-progress/confirm");
	} catch (err) {
		if (!isUndefined(err.response.status)) {
			if (err.response.status === 401) {
				showMsg({ title: { text: "اطلاعات تکراری" } }, { status: "warning", time: 6 });
			}
		}
	}
}

export default function Register(props) {
	return (
		<RegisterProgress>
			<Formik
				initialValues={initialValues}
				onSubmit={({ name, family, mobile, email, pass: password }) => {
					// ? sorting data for calling handleSubmit
					const sortedData = { name, family, mobile, email, password };
					handleSubmit(sortedData);
				}}
				validationSchema={validation}
			>
				{({ errors, touched }) => {
					return (
						<Form className={C.Form}>
							{dataInputs.map(({ name, label, type, auto }) => {
								const error = touched[name] && errors[name];
								return (
									<FieldContainerTag key={name} className={C.FieldContainer}>
										<Label err={error}>{error}</Label>
										<Field
											name={name}
											type={type}
											placeholder={label}
											autoComplete={auto}
										/>
									</FieldContainerTag>
								);
							})}
							<button type="submit" className={C.btnSubmit}>
								عضویت
							</button>
						</Form>
					);
				}}
			</Formik>
		</RegisterProgress>
	);
}

export const Label = styled.label(({ err }) => {
	const color = err ? "red" : "black";
	return {
		color,
		...transition(0.2),
		fontSize: "16px",
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
