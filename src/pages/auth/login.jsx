import { registerForgotPassword, register, tasks } from "../../routes";
import { isUndefined, setCookie } from "../../helpers/exports";
import logInSchema, { loginInitialValues } from "../../schema/login";
import AuthLayout from "../../layout/Auth.layout";
import { _USE_API_ } from "../../api/index.API";
import showMsg from "../../helpers/alerts/msg";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import Router from "next/router";
import { useState } from "react";
import Link from "next/link";

async function handleSubmit(data) {
	try {
		const res = await _USE_API_({ describe: "login user", ignoreStatuses: [401], kickOn401: false }).Post({
			url: "login",
			data,
		});
		const token = res.data.token;
		if (res.status === 200) {
			setCookie({ key: "token", value: token });
			Router.push(tasks);
		}
	} catch (err) {
		if (!isUndefined(err.response) && err.response.status === 401) {
			showMsg({ title: { text: "اطلاعات اشتباه" } }, { status: "warning", time: 8 });
		}
	}
}

const loginInputs = passType => [
	{
		name: "mobile",
		type: "text",
		label: "شماره همراه",
	},
	{
		name: "password",
		type: passType,
		label: "رمز عبور",
		font: "fa fa-eye",
		onFontClick: "toggleShowPass",
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
					initialValues={loginInitialValues}
					onSubmit={data => {
						const { mobile, password } = data;
						const sortedData = { mobile, password };
						handleSubmit(sortedData);
					}}
					validationSchema={logInSchema}
				>
					{({ errors, touched }) => {
						return (
							<Form>
								{loginInputs(passType).map(
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

export const InputField = styled.div(({ theme: { flex, resetInput }, extraStyles = {}, hasErr }) => {
	return {
		...flex(["alignItems", "justifyContent"]),
		justifyContent: "space-between",
		alignItems: "flex-start",
		flexDirection: "column",
		width: "100%",
		height: "100px",
		marginBottom: "10px",
		...resetInput,
		"> div": {
			width: "100%",
			position: "relative",
			marginBottom: "5px",
			"> input": {
				background: "#FFFFFF",
				transition: "border 0.5s",
				color: "#B4BCCA !important",
				padding: "15px",
				border: `1px solid ${hasErr ? "#FF6672" : "#DADADA"}`,
				borderRadius: "4px",
				width: "100%",
				height: "50px",
				"&:focus": { border: "1px solid #5460FE" },
			},
			"> i": {
				position: "absolute",
				left: "10px",
				bottom: "18px",
				cursor: "pointer",
			},
		},
		"> label": {
			fontSize: "14px",
			paddingRight: "15px",
		},
		"> p": {
			height: "25px",
			fontSize: "12px",
			margin: "5px 15px 0 0",
			color: "#FF6672",
			transition: "opacity 0.5s",
			opacity: hasErr ? 1 : 0,
		},
		...extraStyles,
	};
});

export const Content = styled.div(({ theme: { flex, $blue, $bolderBlue }, extraStyles }) => {
	return {
		...flex(["justifyContent", "alignItems"]),
		justifyContent: "flex-start",
		alignItems: "flex-start",
		flexDirection: "column",
		padding: "25px",
		width: "100%",
		height: "100%",
		color: "#54698D",
		"> h1": {
			width: "100%",
			fontSize: "32px",
			fontStyle: "normal",
			fontWeight: "500",
			textAlign: "right",
			marginBottom: "25px",
		},
		"> form": {
			display: "flex",
			justifyContent: "flex-end",
			alignContent: "flex-start",
			flexWrap: "wrap",
			width: "100%",
			height: "100%",
			"> a": {
				display: "block",
				width: "100%",
				height: "15px",
				paddingRight: "15px",
				textAlign: "right",
				fontSize: "12px",
				cursor: "pointer",
				color: $blue,
			},
			"div#half-top": {
				...flex(["justifyContent"]),
				justifyContent: "space-between",
				"> div": {
					width: "45%",
				},
			},
			"> #btns": {
				...flex(["justifyContent"]),
				justifyContent: "flex-end",
				marginTop: "20px",
				height: "50px",
				flex: 1,
				"> button": {
					...flex(),
					minWidth: "120px",
					height: "100%",
					border: "none",
					fontSize: "14px",
					"&#second": {
						backgroundColor: $bolderBlue,
						color: "#FFFFFF",
						borderRadius: "4px",
						marginRight: "30px",
					},
					"&#first": {
						backgroundColor: "transparent",
						color: "#54698D",
						"> a": {
							padding: "5px 0",
							borderBottom: "1px solid #54698D",
						},
					},
				},
			},
		},
		...extraStyles,
	};
});
