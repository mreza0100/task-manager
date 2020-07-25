import { getProfileAndTasks } from "../../redux/actions/profile";
import { flex, reloadRouter, butyInputs } from "../../helpers/exports";
import SettingLayout from "../../layout/Setting.layout";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import { wrapper } from "../../redux/store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";

const inputData = [
	{ name: "name", label: "نام", type: "text" },
	{ name: "family", label: "نام خانوادگی", type: "text" },
	{ name: "mobile", label: "شماره همراه", type: "text" },
	{ name: "email", label: "ایمیل", type: "email" },
];

async function handleSubmit(data, setSubmitting) {
	setSubmitting(true);
	try {
		const res = await _USE_API_({ isPrivetRoute: true, debug: true, describe: "edit profile data" }).Put({
			url: "/profile",
			data,
		});
		if (res.status === 200) reloadRouter();
	} catch (err) {
	} finally {
		setSubmitting(false);
	}
}

export default function profile(props) {
	const profile = useSelector(state => state.profile);
	const { email, family, mobile, name } = profile;
	const [isEditMode, setIsEditmode] = useState(false);
	const onToggleEdit = () => {
		setIsEditmode(!isEditMode);
	};
	return (
		<SettingLayout>
			<Formik
				initialValues={{
					name,
					family,
					email,
					mobile,
				}}
				onSubmit={(data, { setSubmitting }) => {
					const sortedData = { ...data };
					handleSubmit(sortedData, setSubmitting);
				}}
			>
				{({ errors, values, resetForm, isSubmitting }) => {
					return (
						<Form className="row mt-0 mr-auto ml-auto text-right">
							{inputData.map(({ name, label, type }) => {
								if (isEditMode)
									return name !== "mobile" ? (
										<StyledFieldWrapper key={name} className="col-12 row">
											<span className="col-12 p-0">{label}:</span>
											<Field
												name={name}
												type={type}
												placeholder={label}
												className="col-12"
											/>
										</StyledFieldWrapper>
									) : null;
								return (
									<StyledShowWrapper key={name} className="col-12 row">
										<span className="col-5">{label}:</span>
										<span className="col">{values[name]}</span>
									</StyledShowWrapper>
								);
							})}
							<div className="w-100 d-flex justify-content-end mt-2">
								{(isEditMode && (
									<>
										<button
											className="btn btn-warning  mt-3 ml-3"
											onClick={() => {
												onToggleEdit();
												resetForm();
											}}
											type="button"
											disabled={isSubmitting}
										>
											لغو <i className="fa fa-times p-2" />
										</button>
										<button className="btn btn-success  mt-3" disabled={isSubmitting}>
											ثبت <i className="fa fa-save p-2" />
										</button>
									</>
								)) || (
									<button className="btn btn-primary" type="button" onClick={onToggleEdit}>
										ویرایش <i className="fa fa-edit p-2" />
									</button>
								)}
							</div>
						</Form>
					);
				}}
			</Formik>
		</SettingLayout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store: { dispatch }, req, res }) => {
	await dispatch(getProfileAndTasks({ req, res }));
});

const StyledFieldWrapper = styled.div(props => {
	return {
		...butyInputs,
		marginBottom: "8px",
	};
});

const StyledShowWrapper = styled.div(props => {
	return {
		textAlign: "right",
		fontSize: "20px",
		margin: "10px 0",
	};
});

// const StyledShow = styled.div(props => {
// 	return {
// 		...flex(["justifyContent"]),
// 		width: "100%",
// 		textAlign: "right",
// 		margin: "25px 0",
// 		fontSize: "20px",
// 		"> span": {
// 			background: "#1c443d27",
// 		},
// 	};
// });

// TODO: validation schema
// TODO: filter data for mobile

/* 
email: "mrez9090@gmail.com"
family: "khosravi"
mobile: "09361719102"
name: "mreza"
tasksFigure: "line"
userID: "5f0721982c6149b11e53471b"
 */
