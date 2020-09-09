import { registerForgotPassword, register } from "../../routes";
import { isUndefined, setCookie } from "../../helpers/exports";
import AuthLayout from "../../layout/Auth.layout";
import { _USE_API_ } from "../../api/index.API";
import logInSchema from "../../schema/login";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import Router from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Content } from "./login";
import { InputField } from "./login";

async function handleSubmit(data) {
	try {
		const res = await _USE_API_({ describe: "login user", ignoreStatuses: [401], kickOn401: false }).Post({
			url: "login",
			data,
		});
		const token = res.data.token;
		if (res.status === 200) {
			setCookie({ key: "token", value: token });
			Router.push("/");
		}
	} catch (err) {
		if (!isUndefined(err.response) && err.response.status === 401) {
			showMsg({ title: { text: "اطلاعات اشتباه" } }, { status: "warning", time: 8 });
		}
	}
}

export const dataInputs = (passType1, passType2) => [
	{
		name: "name",
		label: "نام",
		type: "text",
	},
	// {
	// 	name: "family",
	// 	label: "نام خانوادگی",
	// 	type: "text",
	// },
	{
		name: "mobile",
		label: "شماره همراه",
		type: "text",
	},
	{
		name: "password1",
		label: "پسورد",
		type: passType1,
	},
	{
		name: "password2",
		label: "تکرار پسورد",
		type: passType2,
	},
];

export default function Login() {
	const [passType, setPassType] = useState("password");
	const inputClicks = {
		toggleShowPass: () => {
			setPassType(passType === "password" ? "text" : "password");
		},
	};

	return (
		<AuthLayout>
			<Content>
				<h1>ورود</h1>
				<Formik
					initialValues={{ mobile: "", password: "" }}
					onSubmit={data => {
						const { mobile, password } = data;
						const sortedData = { mobile, password };
						console.log(sortedData);
						handleSubmit(sortedData);
					}}
					validationSchema={logInSchema}
				>
					{({ errors, touched }) => {
						return (
							<Form>
								{dataInputs(passType).map(
									({ name, type, label, font, onFontClick }, idx) => {
										const inputErr = touched[name] && errors[name];
										// if touched[name] was true inputErr will contains errors[name]
										return (
											<InputField key={idx} hasErr={!!inputErr}>
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
								<Link href={registerForgotPassword}>
									<a>رمز عبور را فراموش کرده ام</a>
								</Link>
								<div id="btns">
									<Link href={register}>
										<button type="button" id="first">
											<a>ساخت حساب کاربری</a>
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
			</Content>
		</AuthLayout>
	);
}
