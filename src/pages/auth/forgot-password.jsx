import AuthLayout from "../../layout/Auth.layout";
import styled from "styled-components";
import { Content } from "./login";
import { useState, Fragment } from "react";

function ResetProgress({ currentStep }) {
	return (
		<ShowProgress>
			{["۱", "۲", "۳"].map((i, idx) => {
				idx++;
				return (
					<Fragment key={idx}>
						<ProgressStep active={currentStep === idx} done={currentStep > idx}>
							<span>{i}</span>
							<i className="fa fa-check" />
						</ProgressStep>
						{idx !== 3 && <ProgressLine active={currentStep > idx} />}
					</Fragment>
				);
			})}
		</ShowProgress>
	);
}
const ProgressLine = styled.span(({ active }) => {
	return { border: `1px solid ${active ? "#6FA0F1" : "#DADADA"}`, flex: 1, margin: "0 10px" };
});

const ProgressStep = styled.div(({ theme: { flex }, active, done }) => {
	const general = {
		...flex(),
		background: "transparent",
		height: "35px",
		width: "35px",
		borderRadius: "100%",
		fontSize: "14px",
	};

	if (active) {
		return {
			...general,
			color: "#6FA0F1",
			border: "1px solid #6FA0F1",
			"> span": { display: "block" },
			"> i": { display: "none" },
		};
	}
	if (done) {
		return {
			...general,
			background: "#6FA0F1",
			border: "1px solid #6FA0F1",
			"> span": { display: "none" },
			"> i": { display: "block" },
		};
	}
	return {
		...general,
		border: "1px solid #DADADA",
		"> i": { display: "none" },
	};
});

const ShowProgress = styled.div(({ theme: { flex } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		flexDirection: "row-reverse",
		userSelect: "none",
		width: "100%",
		height: "30px",
	};
});

function Step1Component() {
	return null;
	// return (
	// 	<Formik
	// 		initialValues={loginInitialValues}
	// 		onSubmit={data => {
	// 			const { mobile, password } = data;
	// 			const sortedData = { mobile, password };
	// 			console.log(sortedData);
	// 			handleSubmit(sortedData);
	// 		}}
	// 		validationSchema={logInSchema}
	// 	>
	// 		{({ errors, touched }) => {
	// 			const inputErr = touched[name] && errors[name];
	// 			// if touched[name] was true inputErr will contains errors[name]
	// 			return (
	// 				<Form>
	// 					<InputField key={idx} hasErr={!!inputErr}>
	// 						<label>{label}</label>
	// 						<div>
	// 							<Field type={type} name={name} />
	// 						</div>
	// 						<p>{inputErr || null}</p>
	// 					</InputField>
	// 					<div id="btns">
	// 						<Link href={register}>
	// 							<button type="button" id="first">
	// 								<a>ساخت حساب کاربری</a>
	// 							</button>
	// 						</Link>
	// 						<button type="submit" id="second">
	// 							ورود
	// 						</button>
	// 					</div>
	// 				</Form>
	// 			);
	// 		}}
	// 	</Formik>
	// );
}

export default function ForgotPassword() {
	const [currentStep, setCurrentStep] = useState(1);
	var Component;

	if (currentStep === 1) {
		Component = Step1Component;
	}

	return (
		<AuthLayout>
			<Content>
				<h1>فراموشی رمز</h1>
				<ResetProgress currentStep={currentStep} />
				<Component />
			</Content>
		</AuthLayout>
	);
}
