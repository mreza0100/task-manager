import { addPeople, getPeople, deleteContact, editContact } from "../../redux/actions/people";
import { butyInputs, flex, phoneRegExp } from "../../helpers/exports";
import { getProfileData } from "../../redux/actions/profile";
import SettingLayout from "../../layout/Setting.layout";
import { useDispatch, useSelector } from "react-redux";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import styled from "styled-components";
import * as yup from "yup";

const yupSchema = yup.object({
	name: yup.string().required().trim(),
	mobile: yup.string().matches(phoneRegExp, "Phone number is not valid").trim().required(),
});

// AddBox
function AddBox({ onSubmit, inBtn, initialValues, extraBtnClass }) {
	initialValues = initialValues || {
		name: "",
		mobile: "",
	};
	return (
		<StyledAddBox className="col-12 justify-content-center row">
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={yupSchema}
				enableReinitialize
			>
				{({ errors }) => {
					return (
						<Form className="col-12 row">
							<Field
								name="name"
								type="text"
								className="col-sm-4"
								placeholder="نام"
							/>
							<Field
								name="mobile"
								type="text"
								className="col-sm-4"
								placeholder="شماره تلفن"
							/>
							<button
								className={`btn btn-primary col-sm-3 ${extraBtnClass}`}
								type="submit"
							>
								{inBtn}
							</button>
						</Form>
					);
				}}
			</Formik>
		</StyledAddBox>
	);
}

const StyledAddBox = styled.div(props => {
	return {
		...butyInputs,
		padding: 0,
		height: "max-content",
		form: {
			padding: 0,
			...flex(["justifyContent"]),
			justifyContent: "space-between",
		},
	};
});
// end AddBox

// modal
function Modal({ people, id }) {
	const { mobile, name } = people.find(contact => contact.id === id);
	const router = useRouter();
	const onCancel = () => router.replace(router.pathname, undefined, { shallow: true });
	const dispatch = useDispatch();

	const initialValues = {
		name,
		mobile,
	};
	const onSubmit = data => {
		dispatch(editContact({ data, id }));
	};
	return (
		<StyledModalWrapper className="container-fluid row">
			<AddBox
				onSubmit={onSubmit}
				inBtn="تغییر اطلاعات کاربر"
				initialValues={initialValues}
				extraBtnClass="btn-success"
			/>
			<button className="btn btn-secondary" onClick={onCancel} type="button">
				لغو
			</button>
		</StyledModalWrapper>
	);
}

const StyledModalWrapper = styled.div(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		flexDirection: "column",
		minHeight: "120px",
		width: "45%",
		height: "max-content",
		position: "absolute",
		top: 10,
		left: "50%",
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: "5px",
		transform: "translate(-50%, 0)",
		transition: "all 0.5s",
		background: "#2374aa",
		"> button": {
			alignSelf: "flex-end",
		},
	};
});
// end modal

export default function People(props) {
	// hooks
	const dispatch = useDispatch();
	const people = useSelector(state => state.people);
	const router = useRouter();

	const onDelete = id => dispatch(deleteContact({ contactID: id }));

	const setQuery = id => {
		scrollTo({
			top: 0,
			behavior: "smooth",
		});
		router.replace(`${router.pathname}?id=${id}`, undefined, { shallow: true });
	};
	const onSubmit = async (data, { resetForm }) => {
		await dispatch(addPeople(data));
		resetForm();
	};

	const inBtn = (
		<>
			اضافه کردن مخاطب
			<i className="fa fa-plus" />
		</>
	);

	const { id: routerID } = router.query;
	return (
		<SettingLayout
			extraClass="row"
			styles={{ justifyContent: "center", alignItems: "flex-start" }}
		>
			<AddBox
				onSubmit={onSubmit}
				inBtn={inBtn}
				extraBtnClass="d-flex justify-content-evenly align-items-center"
			/>
			<ContactsList className="col-12 row">
				{people.map(({ name, mobile, id }) => {
					return (
						<StyledContact key={id} className="row">
							<div className="data col-9">
								<span>نام: {name}</span>
								<span>شماره تلفن: {mobile}</span>
							</div>
							<div className="control col-2 row">
								<i
									className="fa fa-edit col-5"
									onClick={() => setQuery(id)}
								/>
								<i
									className="fa fa-trash col-5"
									onClick={() => onDelete(id)}
								/>
							</div>
						</StyledContact>
					);
				})}
			</ContactsList>
			{routerID && <Modal people={people} id={routerID} StyledAddBox={StyledAddBox} />}
		</SettingLayout>
	);
}

People.getInitialProps = async ({ store: { dispatch, getState }, req, res }) => {
	await dispatch(getProfileData({ req, res, fields: ["name", "family"] }));
	await dispatch(getPeople({ req, res }));
};

const ContactsList = styled.ul(({}) => {
	return {
		padding: "0 15px",
	};
});

const StyledContact = styled.li(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		flex: "0 0 100%",
		color: "#fff",
		padding: 0,
		margin: "8px 0",
		fontSize: "14px",
		".data": {
			...flex(),
			textAlign: "right",
			padding: 0,
			alignItems: "flex-start",
			backgroundColor: "#000000a6",
			borderRadius: 5,
			minHeight: "40px",
			"> span": {
				whiteSpace: "nowrap",
			},
		},
		".control": {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			height: "100%",
			padding: 0,
			i: {
				...flex(),
				height: "65%",
				padding: 0,
				color: "#fff",
				borderRadius: "4px",
				cursor: "pointer",
				maxHeight: "40px",
			},
			"i.fa-trash": {
				backgroundColor: "red",
			},
			"i.fa-edit": {
				backgroundColor: "green",
			},
		},
	};
});
