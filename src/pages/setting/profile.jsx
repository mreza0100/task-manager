import { getProfileData } from "../../redux/actions/profile";
import { reloadRouter } from "../../helpers/exports";
import SettingLayout from "../../layout/Setting.layout";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TopContents } from "..";
import { useRouter } from "next/router";
import { boolean } from "yup";

// TODO: validation schema
// TODO: filter data for mobile

const inputData = [
	{ name: "name", label: "نام", type: "text", editable: true },
	{ name: "family", label: "نام خانوادگی", type: "text", editable: true },
	{ name: "mobile", label: "شماره همراه", type: "text", font: "fa fa-lock", editable: false },
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
	const { email, family, mobile, name } = useSelector(({ profile }) => profile);
	const router = useRouter();
	const isEditMode = router.query.edit === "true" ? true : false;

	const toggleEditMode = () => {
		if (isEditMode) router.push("/setting/profile");
		else router.push(`/setting/profile?edit=true`);
	};

	return (
		<SettingLayout getProfile={{ cancel: true }}>
			<TopContents>
				<h1>
					<i className="icon-miz-logo" />
					<span>پروژه میز - پروفایل</span>
				</h1>
			</TopContents>
			<ProfileWindowContainer>
				<img src={require("../../../public/stupid white chair.png")} />
				<Content>
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
								<Form>
									{inputData.map(({ name, label, type, font, editable }) => {
										return (
											<StyledField key={name}>
												<span>{label}</span>
												<div>
													<Field
														name={name}
														type={type}
														disabled={!false || !editable}
													/>
													{font && <i className={font} />}
												</div>
											</StyledField>
										);
									})}
									<div>
										{false ? (
											<>
												<button
													onClick={() => {
														toggleEditMode();
														resetForm();
													}}
													type="button"
													disabled={isSubmitting}
												>
													لغو <i className="fa fa-times " />
												</button>
												<button
													className="btn btn-success"
													disabled={isSubmitting}
												>
													ثبت <i className="fa fa-save" />
												</button>
											</>
										) : (
											<button
												className="btn btn-primary"
												type="button"
												onClick={toggleEditMode}
											>
												ویرایش <i className="fa fa-edit" />
											</button>
										)}
									</div>
								</Form>
							);
						}}
					</Formik>
				</Content>
			</ProfileWindowContainer>
		</SettingLayout>
	);
}

Profile.getInitialProps = async ({ store: { dispatch }, req, res }) => {
	await dispatch(getProfileData({ req, res }));
};

const StyledField = styled.div(({ theme: { flex } }) => {
	return {
		...flex(["alignItems"]),
		alignItems: "flex-start",
		flexDirection: "column",
		flex: 1,
		marginBottom: "15px",
		"> span": {
			fontSize: "14px",
			whiteSpace: "pre",
			paddingBottom: "10px",
			color: "#54698D",
		},
		"> div": {
			position: "relative",
			width: "100%",
			"> i": { position: "absolute", color: "#54698D", left: "15px", top: "32%", fontSize: "18px" },
			"> input": {
				width: "100%",
				border: "1px solid #DADADA",
				borderRadius: "4px",
				height: "50px",
				"&::placeholder": {
					fontSize: "14px",
					color: "#B4BCCA",
					margin: "10px",
					opacity: "1",
				},
				"&:focus": {
					outline: "none",
				},
				"&[disabled]": {
					opacity: 0.9,
				},
			},
		},
	};
});

const Content = styled.div(({ theme: { flex, $white } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		flexDirection: "column",
		flex: 1,
		height: "100%",
		padding: "30px 38px",
		form: {
			width: "100%",
		},
	};
});

const ProfileWindowContainer = styled.div(({ theme: { flex, $white } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		width: "715px",
		height: "515px",
		margin: "auto",
		background: $white,
		boxShadow: " 0px 0px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "4px",
		img: {
			height: "100%",
			width: "240px",
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
