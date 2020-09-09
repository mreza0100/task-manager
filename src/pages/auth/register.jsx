import registerSchema, { registerInitialValues } from "../../schema/register";
import { confirmRegister, login } from "../../routes";
import { isUndefined } from "../../helpers/exports";
import AuthLayout from "../../layout/Auth.layout";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import { InputField } from "./login";
import { Content } from "./login";
import Router from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setConfirmNum } from "../../redux/actions/confirm";
import showMsg from "../../helpers/alerts/msg";

async function handleSubmit(data, { dispatch }) {
	try {
		const res = await _USE_API_({
			ignoreStatuses: [401],
			kickOn401: false,
			describe: "register user account",
			debug: true,
		}).Post({
			url: "register",
			data,
		});
		if (res.status === 200) {
			dispatch(setConfirmNum({ mobile: data.mobile }));
			Router.push(confirmRegister);
		}
	} catch (err) {
		if (!isUndefined(err.response.status)) {
			if (err.response.status === 401) {
				showMsg({ title: { text: "اطلاعات تکراری" } }, { status: "warning", time: 6 });
			}
		}
	}
}

const dataInputs = (passType1, passType2) => [
	{
		name: "name",
		label: "نام",
		type: "text",
		extraStyles: { flexBasis: "calc(50% - 15px)", marginLeft: "15px" },
	},
	{
		name: "family",
		label: "نام خانوادگی",
		type: "text",
		extraStyles: { flexBasis: "calc(50% - 15px)", marginRight: "15px" },
	},
	{
		name: "mobile",
		label: "شماره همراه",
		type: "text",
	},
	{
		name: "password1",
		label: "پسورد",
		type: passType1,
		font: passType1 === "text" ? "fa fa-eye-slash" : "fa fa-eye",
		onFontClick: "toggleShowPass1",
	},
	{
		name: "password2",
		label: "تکرار پسورد",
		type: passType2,
		font: passType2 === "text" ? "fa fa-eye-slash" : "fa fa-eye",
		onFontClick: "toggleShowPass2",
	},
];

export default function Login() {
	const [passType1, setPassType1] = useState("password");
	const [passType2, setPassType2] = useState("password");
	const dispatch = useDispatch();

	const inputClicks = {
		toggleShowPass1: () => {
			setPassType1(passType1 === "password" ? "text" : "password");
		},
		toggleShowPass2: () => {
			setPassType2(passType2 === "password" ? "text" : "password");
		},
	};

	return (
		<AuthLayout extraStyles={{ height: "618px" }}>
			<Content>
				<h1>ساخت حساب کاربری</h1>
				<Formik
					initialValues={registerInitialValues}
					onSubmit={data => {
						const { name, family, mobile, password1, password2 } = data;
						const sortedData = { name, family, mobile, password: password1 };
						console.log(sortedData);
						handleSubmit(sortedData, { dispatch });
					}}
					validationSchema={registerSchema}
				>
					{({ errors, touched }) => {
						return (
							<Form>
								{dataInputs(passType1, passType2).map(
									(
										{ name, type, label, font, onFontClick, extraStyles },
										idx
									) => {
										const inputErr = touched[name] && errors[name];
										// if touched[name] was true inputErr will contains errors[name]
										return (
											<InputField
												key={idx}
												hasErr={!!inputErr}
												extraStyles={extraStyles}
											>
												<label>{label}</label>
												<div>
													<Field type={type} name={name} />
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
								<div id="btns">
									<Link href={login}>
										<button type="button" id="first">
											<a>عضو هستم، صفحه ورود</a>
										</button>
									</Link>
									<button type="submit" id="second">
										عضویت
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</Content>
		</AuthLayout>
	);
}
