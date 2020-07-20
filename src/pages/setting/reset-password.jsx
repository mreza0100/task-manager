import { FieldContainerTag, Label, C } from "../register";
import { phoneRegExp, deleteCookie } from "../../helpers/exports";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import SettingLayout from "../../layout/Setting.layout";
import * as yup from "yup";
import { useState } from "react";
import Router from "next/router";
// !--

const step_1 = {
	dataInputs: [{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" }],
	initialValues: {
		mobile: ""
	},
	validation: yup.object({
		mobile: yup.string().trim().matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد").min(11).max(11).required()
	}),
	async handleSubmit(data) {
		try {
			const res = await _USE_API_({
				debug: true,
				describe: "reset password step 1"
			}).Post({
				url: "forgot_password",
				data
			});
			return res.status;
		} catch (err) {
			console.dir(err);
			return 0;
		}
	}
};

const step_2 = {
	dataInputs: [
		{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" },
		{
			name: "activisionCode",
			label: "کد فرستاده شده به شماره شما",
			type: "text",
			auto: "off"
		},
		{
			name: "newPassword",
			label: "پسورد جدید",
			type: "password",
			auto: "off"
		},
		{
			name: "confirmNewPassword",
			label: "تایید پسورد",
			type: "password",
			auto: "off"
		}
	],
	initialValues: {
		mobile: "",
		activisionCode: "",
		newPassword: "",
		confirmNewPassword: ""
	},
	validation: yup.object({
		mobile: yup.string().trim().matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد").min(11).max(11).required(),
		activisionCode: yup.string().trim().min(4).max(4).required(),
		newPassword: yup.string().trim().min(8).required(),
		confirmNewPassword: yup
			.string()
			.trim()
			.oneOf([yup.ref("newPassword"), null], "Passwords must match")
			.required()
	}),
	async handleSubmit(data) {
		try {
			const res = await _USE_API_({
				debug: true,
				pendingID: "reset-password",
				describe: "reset password step 2"
			}).Post({ url: "/reset_password", data });
			if (res.status === 200) {
				deleteCookie("token");
				Router.push("/login");
			}
		} catch (err) {
			console.dir(err);
		}
	}
};

export default function ResetPassword(props) {
	const [step, setStep] = useState(1);
	if (step === 1) var { dataInputs, handleSubmit, initialValues, validation } = step_1;
	else var { dataInputs, handleSubmit, initialValues, validation } = step_2;

	const onSubmit_1 = ({ mobile }) => {
		const sortedData = { mobile };
		handleSubmit(sortedData).then(status => {
			if (status === 200) setStep(2);
		});
	};

	const onSubmit_2 = ({ mobile, activisionCode, newPassword }) => {
		const sortedData = {
			mobile,
			activation_code: activisionCode,
			new_password: newPassword
		};
		step_2.handleSubmit(sortedData);
	};

	return (
		<SettingLayout>
			<div className="w-50 row justify-content-between m-auto">
				<span className={`cursor-pointer ${step === 1 ? "text-danger" : ""}`} onClick={e => setStep(1)}>
					مرحله اول
				</span>
				<span className={`cursor-pointer ${step === 2 ? "text-danger" : ""}`} onClick={e => setStep(2)}>
					مرحله دوم
				</span>
			</div>
			<Formik
				initialValues={initialValues}
				onSubmit={step === 1 ? onSubmit_1 : onSubmit_2}
				validationSchema={validation}
			>
				{({ errors, touched }) => {
					return (
						<main className={C.FieldContainer}>
							<Form className={C.Form}>
								{dataInputs.map(({ name, label, type, auto }) => {
									const err = touched[name] && errors[name];
									return (
										<FieldContainerTag key={name} className={C.FieldContainer}>
											<Label err={err}>{err ?? label}</Label>
											<Field name={name} type={type} autoComplete={auto} />
										</FieldContainerTag>
									);
								})}
								<button className={C.btnSubmit}>ثبت</button>
							</Form>
						</main>
					);
				}}
			</Formik>
		</SettingLayout>
	);
}
