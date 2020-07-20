// import { Formik, Form, Field } from "formik";
// import { _USE_API_ } from "../../api/index.API";
// import Router from "next/router";
// import * as yup from "yup";
// // !--
// import { FieldContainerTag, Label, C } from "../register";
// import { phoneRegExp } from "../../helpers/exports";
// const __dataInputs__ = [{ name: "mobile", label: "شماره همراه", type: "text" }];

// const initialValues = {
// 	mobile: "",
// };

// const validation = yup.object({
// 	mobile: yup
// 		.string()
// 		.trim()
// 		.matches(phoneRegExp, "شماره تلفن وارد شده صحیح نمیباشد")
// 		.min(11)
// 		.max(11)
// 		.required(),
// });

// async function handleSubmit_1(data) {
// 	const res = await _USE_API_({
// 		debug: true,
// 		describe: "handle forgot password step 1",
// 	}).Post({
// 		url: "forgot_password",
// 		data,
// 	});
// 	if (res.status === 200) Router.push("/reset-password");
// }

// export default props => {
// 	return (
// 		<Formik
// 			initialValues={initialValues}
// 			onSubmit={({ mobile }) => {
// 				const data = { mobile };
// 				handleSubmit(data);
// 			}}
// 			validationSchema={validation}
// 		>
// 			{({ errors, touched }) => {
// 				return (
// 					<main className={C.FieldContainer}>
// 						<Form className={C.Form}>
// 							{__dataInputs__.map(({ name, label, type }) => {
// 								const err = touched[name] && errors[name];
// 								return (
// 									<FieldContainerTag key={name} className={C.FieldContainer}>
// 										<Label err={err}>{err ?? label}</Label>
// 										<Field name={name} type={type} />
// 									</FieldContainerTag>
// 								);
// 							})}
// 							<button className={C.btnSubmit} type="submit">
// 								ثبت
// 							</button>
// 						</Form>
// 					</main>
// 				);
// 			}}
// 		</Formik>
// 	);
// };
