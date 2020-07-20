import { FieldContainerTag, Label, C } from "./register";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { phoneRegExp } from "../helpers/exports";
import { _USE_API_ } from "../api/index.API";
import { setCookie } from "../helpers/exports";
import Router from "next/router";

const __dataInputs__ = [
	{ name: "mobile", label: "شماره موبایل", type: "text" },
	{ name: "password", label: "گذرواژه", type: "password" },
];

const initialValues = { mobile: "", password: "" };

const validation = yup.object({
	mobile: yup
		.string()
		.trim()
		.min(11)
		.max(11)
		.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
		.required(),
	password: yup.string().trim().min(8).required(" پسورد چی پس"),
});

async function handleSubmit(data) {
	try {
		const res = await _USE_API_({ debug: true, describe: "login user" }).Post({
			url: "login",
			data,
		});
		if (res.status === 200) {
			setCookie({ key: "token", value: res.data.token });
			Router.push("/");
		}
	} catch (err) {
		if (err.response.status === 401) alert("اطلاعات اشتباه");
		else alert("به سرور متصل نشد");
	}
}

export default function login(props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={({ mobile, password }) => {
				const sortedData = { mobile, password };
				handleSubmit(sortedData);
			}}
			validationSchema={validation}
		>
			{({ errors, touched }) => {
				return (
					<main className={C.FieldContainer}>
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
					</main>
				);
			}}
		</Formik>
	);
}
