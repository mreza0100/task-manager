import RegisterProgress from "../../layout/RegisterProgress.layout";
import { FieldContainerTag, Label, C } from "./register";
import { phoneRegExp } from "../../helpers/exports";
import { Formik, Form, Field } from "formik";
import { _USE_API_ } from "../../api/index.API";
import Router from "next/router";
import * as yup from "yup";
// !--
const dataInputs = [
	{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" },
	{ name: "code", label: "کد فر ستاده شده بر روی دستگاه شما", type: "text", auto: "off" },
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
	try {
		const res = await _USE_API_({
			describe: "confirm creating account",
		}).Post({ url: "active_account", data });
		if (res.status === 200) Router.push("/register-progress/login");
	} catch (err) {
		// TODO: showMsg
	}
}

export default function Confirm(props) {
	return (
		<RegisterProgress>
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
						<div className={C.FieldContainer}>
							<Form className={C.Form}>
								{dataInputs.map(({ name, label, type, auto }) => {
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
												autoComplete={auto}
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
		</RegisterProgress>
	);
}
