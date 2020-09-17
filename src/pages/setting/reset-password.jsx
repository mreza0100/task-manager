// import { FieldContainerTag, Label, C } from "../auth/register";
// import { step_1, step_2 } from "../../schema/reset-password";
// import { getProfileData } from "../../redux/actions/profile";
// import SettingLayout from "../../layout/Setting.layout";
// import { _USE_API_ } from "../../api/index.API";
// import showMsg from "../../helpers/alerts/msg";
// import { flex } from "../../helpers/exports";
// import { Formik, Form, Field } from "formik";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
// import { TopContents } from "../index";
// import { useState } from "react";
// // !--

// export default function ResetPassword(props) {
// 	const initialMobile = useSelector(state => state.profile.mobile);
// 	const [step, setStep] = useState(1);
// 	if (step === 1) var { dataInputs, handleSubmit, validation } = step_1;
// 	else var { dataInputs, handleSubmit, validation } = step_2;

// 	const onSubmit_1 = ({ mobile }, { setSubmitting }) => {
// 		setSubmitting(true);
// 		const sortedData = { mobile };
// 		handleSubmit(sortedData)
// 			.then(status => {
// 				if (status === 200) {
// 					showMsg(
// 						{ title: { text: "کد با موفقیت به دستگاه شما ارسال شد" } },
// 						{ time: 3, status: "success" }
// 					);
// 					setStep(2);
// 				}
// 			})
// 			.finally(() => {
// 				setSubmitting(false);
// 			});
// 	};

// 	const onSubmit_2 = ({ mobile, activisionCode, newPassword }, { setSubmitting }) => {
// 		setSubmitting(true);
// 		const sortedData = {
// 			mobile,
// 			activation_code: activisionCode,
// 			new_password: newPassword,
// 		};
// 		handleSubmit(sortedData, { setSubmitting });
// 	};

// 	return (
// 		<SettingLayout>
// 			<TopContents>
// 				<h1>
// 					<i className="icon-miz-logo" />
// 					<span>پروژه میز - پروفایل</span>
// 				</h1>
// 			</TopContents>
// 			<StyledBtnSteps>
// 				<span className={step === 1 ? "text-danger" : null} onClick={e => setStep(1)}>
// 					مرحله اول
// 				</span>
// 				<span className={step === 2 ? "text-danger" : null} onClick={e => setStep(2)}>
// 					مرحله دوم
// 				</span>
// 			</StyledBtnSteps>
// 			<Formik
// 				initialValues={{
// 					mobile: initialMobile,
// 					activisionCode: "",
// 					newPassword: "",
// 					confirmNewPassword: "",
// 				}}
// 				onSubmit={step === 1 ? onSubmit_1 : onSubmit_2}
// 				validationSchema={validation}
// 			>
// 				{({ errors, touched, isSubmitting }) => {
// 					return (
// 						<main className={C.FieldContainer}>
// 							<Form className={C.Form}>
// 								{dataInputs.map(({ name, label, type, auto }) => {
// 									const err = touched[name] && errors[name];
// 									return (
// 										<FieldContainerTag
// 											key={name}
// 											className={C.FieldContainer}
// 										>
// 											<Label htmlFor={name} err={err}>
// 												{err}
// 											</Label>
// 											<Field
// 												name={name}
// 												type={type}
// 												placeholder={label}
// 												autoComplete={auto}
// 											/>
// 										</FieldContainerTag>
// 									);
// 								})}
// 								<button
// 									className={C.btnSubmit}
// 									disabled={isSubmitting}
// 									type="submit"
// 								>
// 									ثبت
// 								</button>
// 							</Form>
// 						</main>
// 					);
// 				}}
// 			</Formik>
// 		</SettingLayout>
// 	);
// }

// ResetPassword.getInitialProps = async ({ store: { dispatch, getState }, req, res }) => {
// 	await dispatch(getProfileData({ req, res, fields: ["mobile", "name", "family"] }));
// };
// const StyledBtnSteps = styled.div(props => {
// 	return {
// 		...flex(["justifyContent"]),
// 		justifyContent: "space-between",
// 		width: "50%",
// 		margin: "0 auto 0 auto",
// 		"> span": {
// 			cursor: "pointer",
// 		},
// 	};
// });

export default function ResetPassword() {
	return null;
}
