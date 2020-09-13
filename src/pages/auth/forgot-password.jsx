import { login, registerForgotPassword } from "../../routes";
import { step1, step2 } from "../../schema/reset-password";
import { isUndefined } from "../../helpers/exports";
import CodeInput from "../../components/CodeInput";
import AuthLayout from "../../layout/Auth.layout";
import { _USE_API_ } from "../../api/index.API";
import showMsg from "../../helpers/alerts/msg";
import { Formik, Form, Field } from "formik";
import { InputField } from "./login";
import { Content } from "./login";
import { useState } from "react";
import Link from "next/link";

const step2inputs = ({ pass, confirm }) => [
	{
		name: "password",
		type: pass,
		label: "رمز عبور جدید",
		font: "fa fa-eye",
		onFontClick: "toggleShowPass",
	},
	{
		name: "confirmPassword",
		type: confirm,
		label: "تکرار رمز عبور جدید",
		font: "fa fa-eye",
		onFontClick: "toggleShowConfirm",
	},
];

async function handleSubmitStep1(data, { setCurrentStep, setMobile }) {
	try {
		const res = await _USE_API_({
			ignoreStatuses: [401],
			describe: "reset password step 1",
		}).Post({
			url: "/forgot_password",
			data,
		});
		if (res.status === 200) {
			setCurrentStep(2);
			setMobile(data.mobile);
		}
	} catch (err) {
		if (!isUndefined(err.response) && err.response.status === 401)
			showMsg({ title: { text: "این شماره در سیستم ثبت نشده است" } }, { time: 6, status: "warning" });
	}
}

async function handleSubmitStep2(data) {
	console.log(data);
	const backToLogin = () => Router.push(login);

	try {
		const res = await _USE_API_({
			describe: "reset password step 2",
			ignoreStatuses: [401],
			debug: true,
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
					title: { text: "کد یا شماره اشتباه است" },
				},
				{ time: 8, status: "warning" }
			);
		}
	}
}

var code;
export default function ForgotPassword() {
	const [currentStep, setCurrentStep] = useState(1);
	const [passtypes, setPassTypes] = useState({ pass: "password", confirm: "password" });
	const [mobile, setMobile] = useState(0);

	const getCodes = typedCode => {
		code = typedCode;
	};

	const inputClicks = {
		toggleShowPass: () => {
			setPassTypes({ ...passtypes, pass: passtypes.pass === "password" ? "text" : "password" });
		},
		toggleShowConfirm: () => {
			setPassTypes({ ...passtypes, confirm: passtypes.confirm === "password" ? "text" : "password" });
		},
	};

	return (
		<AuthLayout>
			<Content>
				<h1>فراموشی رمز</h1>
				{currentStep === 1 ? (
					<Formik
						enableReinitialize
						initialValues={step1.intialValues}
						validationSchema={step1.schema}
						onSubmit={data => {
							handleSubmitStep1(data, { setCurrentStep, setMobile });
						}}
					>
						{({ errors, touched }) => {
							const inputErr = touched["mobile"] && errors["mobile"];
							// if touched[name] was true inputErr will contains errors[name]
							return (
								<Form>
									<InputField hasErr={!!inputErr}>
										<label>شماره همراه خود را وارد کنید</label>
										<div>
											<Field type="text" name="mobile" />
										</div>
										<p>{inputErr || null}</p>
									</InputField>
									<div id="btns">
										<Link href={login}>
											<button type="button" id="first">
												<a>تغییر شماره همراه</a>
											</button>
										</Link>
										<button type="submit" id="second">
											ورود
										</button>
									</div>
								</Form>
							);
						}}
					</Formik>
				) : (
					<Formik
						enableReinitialize
						initialValues={step2.intialValues}
						validationSchema={step2.schema}
						onSubmit={data => {
							const sortedData = {
								new_password: data.password,
								activation_code: code,
								mobile,
							};
							handleSubmitStep2(sortedData);
						}}
					>
						{({ errors, touched }) => {
							return (
								<Form>
									<CodeInput
										getCodes={getCodes}
										title="کد 5 رقمی که به شماره 09369769022 ارسال شده را وارد نمایید"
										// error="awd"
									/>
									{step2inputs(passtypes).map(
										({ name, type, label, font, onFontClick }, idx) => {
											const inputErr = touched[name] && errors[name];
											// if touched[name] was true inputErr will contains errors[name]

											return (
												<InputField key={idx} hasErr={!!inputErr}>
													<label>{label}</label>
													<div>
														<Field
															type={type}
															name={name}
														/>
														{font && (
															<i
																className={font}
																onClick={
																	inputClicks[
																		onFontClick
																	]
																}
															/>
														)}
													</div>
													<p>{inputErr || null}</p>
												</InputField>
											);
										}
									)}
									<Link href={registerForgotPassword}>
										<a>ارسال مجدد کد تایید</a>
									</Link>
									<div id="btns">
										<Link href={registerForgotPassword}>
											<button type="button" id="first">
												<a>تغییر شماره همراه</a>
											</button>
										</Link>
										<button type="submit" id="second">
											تایید و ورود
										</button>
									</div>
								</Form>
							);
						}}
					</Formik>
				)}
			</Content>
		</AuthLayout>
	);
}
