import { phoneRegExp, setCookie } from "../../helpers/exports";
import { FieldContainerTag, Label, C } from "./register";
import { _USE_API_ } from "../../api/index.API";
import showMsg from "../../helpers/alerts/msg";
import { Formik, Form, Field } from "formik";
import Router from "next/router";
import * as yup from "yup";
import RegisterProgressLayout from "../../layout/RegisterProgress.layout";

const dataInputs = [
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
		const res = await _USE_API_({ describe: "login user", ignoreStatuses: [401] }).Post({
			url: "login",
			data,
		});
		if (res.status === 200) {
			setCookie({ key: "token", value: res.data.token });
			Router.push("/");
		}
	} catch (err) {
		if (err.response.status === 401)
			showMsg({ title: { text: "اطلاعات اشتباه" } }, { status: "warning", time: 8 });
	}
}

export default function Login(props) {
	return (
		<RegisterProgressLayout>
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
						<div className={C.FieldContainer}>
							<Form className={C.Form}>
								{dataInputs.map(({ name, label, type }) => {
									const err = touched[name] && errors[name];
									return (
										<FieldContainerTag
											key={name}
											className={C.FieldContainer}
										>
											<Label err={err}>{err}</Label>
											<Field
												name={name}
												type={type}
												placeholder={label}
											/>
										</FieldContainerTag>
									);
								})}
								<button className={C.btnSubmit} type="submit">
									ثبت
								</button>
							</Form>
						</div>
					);
				}}
			</Formik>
		</RegisterProgressLayout>
	);
}
