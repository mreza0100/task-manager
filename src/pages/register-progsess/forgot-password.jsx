import { FieldContainerTag, Label, C } from "../../pages/register-progsess/register";
import RegisterProgress from "../../layout/RegisterProgress.layout";
import { step_1, step_2 } from "../setting/reset-password";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import showMsg from "../../helpers/alerts/msg";
import { useState } from "react";

export default function ResetPassword(props) {
	const [step, setStep] = useState(1);
	if (step === 1) var { dataInputs, handleSubmit, validation } = step_1;
	else var { dataInputs, handleSubmit, validation } = step_2;

	const onSubmit_1 = ({ mobile }, { setSubmitting }) => {
		setSubmitting(true);
		const sortedData = { mobile };
		handleSubmit(sortedData)
			.then(status => {
				if (status === 200) {
					showMsg({ title: { text: "کد با موفقیت به دستگاه شما ارسال شد" } }, { time: 3, status: "success" });
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
		<RegisterProgress>
			<div className="w-50 row justify-content-between mr-auto ml-auto">
				<span className={`c-p ${step === 1 ? "text-danger" : ""}`} onClick={e => setStep(1)}>
					مرحله اول
				</span>
				<span className={`c-p ${step === 2 ? "text-danger" : ""}`} onClick={e => setStep(2)}>
					مرحله دوم
				</span>
			</div>
			<Formik
				initialValues={{
					mobile: "",
					activisionCode: "",
					newPassword: "",
					confirmNewPassword: "",
				}}
				onSubmit={step === 1 ? onSubmit_1 : onSubmit_2}
				validationSchema={validation}
			>
				{({ errors, touched, isSubmitting }) => {
					return (
						<div className={C.FieldContainer}>
							<Form className={C.Form}>
								{dataInputs.map(({ name, label, type, auto }) => {
									const err = touched[name] && errors[name];
									return (
										<FieldContainerTag key={name} className={C.FieldContainer}>
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
								<button className={C.btnSubmit} disabled={isSubmitting} type="submit">
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
