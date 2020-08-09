import { FieldContainerTag, Label, C } from "../../pages/register-progsess/register";
import { phoneRegExp, deleteCookie, isUndefined } from "../../helpers/exports";
import { getProfileData } from "../../redux/actions/profile";
import SettingLayout from "../../layout/Setting.layout";
import { _USE_API_ } from "../../api/index.API";
import showMsg from "../../helpers/alerts/msg";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { useState } from "react";
import Router from "next/router";
import * as yup from "yup";
// !--

export const step_1 = {
	dataInputs: [{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" }],
	validation: yup.object({
		mobile: yup
			.string()
			.trim()
			.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
			.min(11)
			.max(11)
			.required(),
	}),
	async handleSubmit(data) {
		try {
			const res = await _USE_API_({
				ignoreStatuses: [401],
				describe: "reset password step 1",
			}).Post({
				url: "forgot_password",
				data,
			});
			return res.status;
		} catch (err) {
			console.dir(err);
			if (!isUndefined(err.response) && err.response.status === 401)
				showMsg(
					{ title: { text: "این شماره در سیستم ثبت نشده است" } },
					{ time: 6, status: "warning" }
				);
			return 0;
		}
	},
};

export const step_2 = {
	dataInputs: [
		{ name: "mobile", label: "شماره همراه", type: "text", auto: "on" },
		{
			name: "activisionCode",
			label: "کد فرستاده شده به شماره شما",
			type: "text",
			auto: "off",
		},
		{
			name: "newPassword",
			label: "پسورد جدید",
			type: "password",
			auto: "off",
		},
		{
			name: "confirmNewPassword",
			label: "تایید پسورد",
			type: "password",
			auto: "off",
		},
	],
	validation: yup.object({
		mobile: yup
			.string()
			.trim()
			.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
			.min(11)
			.max(11)
			.required(),
		activisionCode: yup
			.number()
			.test("len", "Must be exactly 4 characters", val => (val ? val.toString().length === 4 : true))
			.required(),
		newPassword: yup.string().trim().min(8).required(),
		confirmNewPassword: yup
			.string()
			.trim()
			.oneOf([yup.ref("newPassword"), null], "Passwords must match")
			.required(),
	}),
	async handleSubmit(data, { setSubmitting }) {
		const backToLogin = () => Router.push("/register-progsess/login");

		try {
			const res = await _USE_API_({
				pendingID: "reset-password",
				describe: "reset password step 2",
				ignoreStatuses: [401],
				debug: false,
			}).Post({ url: "/reset_password", data });
			console.log(res);
			if (res.status === 200) {
				deleteCookie("token");
				showMsg(
					{
						title: {
							text: "گذرواژه شما با موفقیت عوض شد",
						},
						body: { text: "در حال برگشت به صفحه ورود" },
					},
					{ time: 3, status: "success" },
					backToLogin
				);
			}
		} catch (err) {
			if (err.response.status === 401) {
				showMsg(
					{
						title: { text: "کد اشتباه است" },
					},
					{ time: 8, status: "warning" }
				);
			}
		} finally {
			setSubmitting(false);
		}
	},
};

export default function ResetPassword(props) {
	const initialMobile = useSelector(state => state.profile.mobile);
	const [step, setStep] = useState(1);
	if (step === 1) var { dataInputs, handleSubmit, validation } = step_1;
	else var { dataInputs, handleSubmit, validation } = step_2;

	const onSubmit_1 = ({ mobile }, { setSubmitting }) => {
		setSubmitting(true);
		const sortedData = { mobile };
		handleSubmit(sortedData)
			.then(status => {
				if (status === 200) {
					showMsg(
						{ title: { text: "کد با موفقیت به دستگاه شما ارسال شد" } },
						{ time: 3, status: "success" }
					);
					setStep(2);
				}
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const onSubmit_2 = ({ mobile, activisionCode, newPassword }, { setSubmitting }) => {
		setSubmitting(true);
		const sortedData = {
			mobile,
			activation_code: activisionCode,
			new_password: newPassword,
		};
		handleSubmit(sortedData, { setSubmitting });
	};

	return (
		<SettingLayout>
			<div className="w-50 row justify-content-between m-auto">
				<span className={`c-p ${step === 1 ? "text-danger" : ""}`} onClick={e => setStep(1)}>
					مرحله اول
				</span>
				<span className={`c-p ${step === 2 ? "text-danger" : ""}`} onClick={e => setStep(2)}>
					مرحله دوم
				</span>
			</div>
			<Formik
				initialValues={{
					mobile: initialMobile,
					activisionCode: "",
					newPassword: "",
					confirmNewPassword: "",
				}}
				onSubmit={step === 1 ? onSubmit_1 : onSubmit_2}
				validationSchema={validation}
			>
				{({ errors, touched, isSubmitting }) => {
					return (
						<main className={C.FieldContainer}>
							<Form className={C.Form}>
								{dataInputs.map(({ name, label, type, auto }) => {
									const err = touched[name] && errors[name];
									return (
										<FieldContainerTag
											key={name}
											className={C.FieldContainer}
										>
											<Label htmlFor={name} err={err}>
												{err}
											</Label>
											<Field
												name={name}
												type={type}
												placeholder={label}
												autoComplete={auto}
											/>
										</FieldContainerTag>
									);
								})}
								<button
									className={C.btnSubmit}
									disabled={isSubmitting}
									type="submit"
								>
									ثبت
								</button>
							</Form>
						</main>
					);
				}}
			</Formik>
		</SettingLayout>
	);
}

ResetPassword.getInitialProps = async ({ store: { dispatch, getState }, req, res }) => {
	await dispatch(getProfileData({ req, res, fields: ["mobile", "name", "family"] }));
};
