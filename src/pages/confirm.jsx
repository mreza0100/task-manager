import { FieldContainerTag, Label, C } from "./register";
import { phoneRegExp } from "../helpers/exports";
import { Formik, Form, Field } from "formik";
import { _USE_API_ } from "../api/index.API";
import styled from "styled-components";
import Router from "next/router";
import * as yup from "yup";
// !--
const __dataInputs__ = [
	{ name: "mobile", label: "شماره همراه", type: "text" },
	{ name: "code", label: "کد فر ستاده شده بر روی دستگاه شما", type: "text" },
];

const initialValues = {
	mobile: "",
	code: "",
};

const validation = yup.object({
	mobile: yup
		.string()
		.trim()
		.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
		.min(11)
		.max(11)
		.required(),
	code: yup.string().trim().min(4).max(4).required(),
});

async function handleSubmit(data) {
	const res = await _USE_API_({
		describe: "confirm creating account",
	}).Post({ url: "active_account", data });
	if (res.status === 200) {
		Router.push("/login");
	}
}

export default props => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={({ mobile, code }) => {
				const data = { mobile, activation_code: code };
				handleSubmit(data);
			}}
			validationSchema={validation}
		>
			{({ errors, touched }) => {
				return (
					<StyledMain className={C.FieldContainer}>
						<Form className={C.Form}>
							{__dataInputs__.map(({ name, label, type }) => {
								const err = touched[name] && errors[name];
								return (
									<FieldContainerTag key={name} className={C.FieldContainer}>
										<Label err={err}>{err ?? label}</Label>
										<Field name={name} type={type} />
									</FieldContainerTag>
								);
							})}
							<button className={C.btnSubmit} type="submit">
								ثبت
							</button>
						</Form>
					</StyledMain>
				);
			}}
		</Formik>
	);
};

const StyledMain = styled.main(props => {
	return {};
});
