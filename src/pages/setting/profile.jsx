import { getProfileData } from "../../redux/actions/profile";
import { reloadRouter, butyInputs } from "../../helpers/exports";
import SettingLayout from "../../layout/Setting.layout";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";

// TODO: validation schema
// TODO: filter data for mobile

const inputData = [
	{ name: "name", label: "نام", type: "text", editable: true },
	{ name: "family", label: "نام خانوادگی", type: "text", editable: true },
	{ name: "mobile", label: "شماره همراه", type: "text", editable: false },
	{ name: "email", label: "ایمیل", type: "email", editable: true },
];

async function handleSubmit(data, setSubmitting) {
	setSubmitting(true);
	try {
		const res = await _USE_API_({
			isPrivetRoute: true,
			debug: true,
			describe: "edit profile data",
		}).Put({
			url: "/profile",
			data,
		});
		if (res.status === 200) reloadRouter();
	} catch (err) {
	} finally {
		setSubmitting(false);
	}
}

export default function Profile() {
	const { email, family, mobile, name } = useSelector(state => state.profile);
	const [editMode, setEditmode] = useState(false);

	const onToggleEditMode = () => setEditmode(!editMode);

	return (
		<SettingLayout getProfile={{ cancel: true }}>
			<Formik
				initialValues={{
					name,
					family,
					email,
					mobile,
				}}
				onSubmit={(data, { setSubmitting }) => {
					delete data.mobile;
					const sortedData = { ...data };
					handleSubmit(sortedData, setSubmitting);
				}}
			>
				{({ resetForm, isSubmitting }) => {
					return (
						<Form className="row mt-0 mr-auto ml-auto text-right">
							{inputData.map(({ name, label, type, editable }) => {
								return (
									<StyledFieldWrapper key={name} className="col-12 row p-0">
										<span className="col-2 p-0 mt-auto mb-auto">
											{label}:
										</span>
										<Field
											name={name}
											type={type}
											className="col-8"
											disabled={!editMode || !editable}
										/>
									</StyledFieldWrapper>
								);
							})}
							<div className="col-12 row justify-content-end align-items-center mt-2 p-0">
								{editMode ? (
									<>
										<button
											className="btn btn-secondary ml-3"
											onClick={() => {
												onToggleEditMode();
												resetForm();
											}}
											type="button"
											disabled={isSubmitting}
										>
											لغو <i className="fa fa-times p-2" />
										</button>
										<button
											className="btn btn-success"
											disabled={isSubmitting}
										>
											ثبت <i className="fa fa-save p-2" />
										</button>
									</>
								) : (
									<button
										className="btn btn-primary"
										type="button"
										onClick={onToggleEditMode}
									>
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

Profile.getInitialProps = async ({ store: { dispatch }, req, res }) => {
	await dispatch(getProfileData({ req, res }));
};

const StyledFieldWrapper = styled.div(props => {
	return {
		...butyInputs,
		marginBottom: "8px",
		"input[disabled]": {
			opacity: 0.7,
		},
	};
});

/* 
email: "mrez9090@gmail.com"
family: "khosravi"
mobile: "09361719102"
name: "mreza"
tasksFigure: "line"
userID: "5f0721982c6149b11e53471b"
 */
