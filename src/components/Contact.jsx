import { deleteContact, editContact, toggleSelectedContact } from "../redux/actions/contacts";
import { StyledCheckBox } from "./task/CheckBox";
import contactsSchema from "../schema/contacts";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function ContactComponent({ data, selected }) {
	const [isEditMode, setEditMode] = useState(false);
	const { name, mobile, id: contactID } = data;
	const dispatch = useDispatch();

	const closeEdutMode = () => {
		setEditMode(false);
	};
	const closeOnEscape = ({ key }) => {
		if (key === "Escape") closeEdutMode();
	};

	useEffect(() => {
		if (isEditMode) window.addEventListener("keydown", closeOnEscape);
		else window.removeEventListener("keydown", closeOnEscape);
		return () => {
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isEditMode]);

	if (isEditMode) {
		return (
			<Contact>
				<Formik
					initialValues={{ name, mobile }}
					validationSchema={contactsSchema}
					onSubmit={data => {
						const sortedData = {
							...data,
							id: contactID,
						};
						dispatch(editContact({ data: sortedData, closeEdutMode }));
					}}
				>
					{({ errors, setValues, values }) => {
						return (
							<Form>
								<div className="input">
									<Field name="name" />
									<i
										className="fa fa-times"
										onClick={() => {
											setValues({ name: "", mobile: values.mobile });
										}}
									/>
								</div>
								<div className="input">
									<Field name="mobile" />
									<i
										className="fa fa-times"
										onClick={() => {
											setValues({ name: values.name, mobile: "" });
										}}
									/>
								</div>
								<div className="edit-btns">
									<button
										type="button"
										className="cancel"
										onClick={closeEdutMode}
									>
										<i className="fa fa-times" />
										لغو
									</button>
									<button type="submit" className="submit">
										<i className="fa fa-check" />
										تایید
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</Contact>
		);
	}

	return (
		<Contact>
			<div className="name">{name}</div>
			<a href={`tel:${mobile}`}>{mobile}</a>
			<div className="controllers">
				<i
					className="icon-pen"
					onClick={() => {
						setEditMode(true);
					}}
				/>
				<i className="icon-trash" onClick={() => dispatch(deleteContact({ contactID }))} />
				<StyledCheckBox
					selected={selected}
					onClick={() => dispatch(toggleSelectedContact({ contactID, selected }))}
				>
					<i className="fa fa-check" />
				</StyledCheckBox>
			</div>
		</Contact>
	);
}

const Contact = styled.div(({ theme: { flex, $white, $blueTxt, resetInput } }) => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-between",
		width: "100%",
		height: "50px",
		padding: "0 20px",
		background: $white,
		boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "4px",
		marginBottom: "10px",
		"> div": {
			flex: 0.2,
			"&.name": {
				color: "#54698D",
				fontSize: "12px",
				textAlign: "right",
			},
		},
		"> a": {
			flex: 0.2,
			color: "#5460FE",
			fontSize: "12px",
			cursor: "pointer",
			textAlign: "right",
		},
		".controllers": {
			...flex(["justifyContent"]),
			justifyContent: "flex-end",
			"> i.icon-trash": { color: "#FF6672", cursor: "pointer" },
			"> i.icon-pen": { color: $blueTxt, cursor: "pointer" },
			"> *": {
				margin: "0 8px",
			},
		},
		form: {
			...resetInput,
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			width: "100%",
			height: "100%",
			"> div.input": {
				height: "65%",
				...flex(["justifyContent"]),
				justifyContent: "space-between",
				flex: "0.2",
				padding: "0 10px",
				background: "#F5F6FA",
				"> i": {
					color: "#B4BCCA",
					cursor: "pointer",
					fontSize: "12px",
					left: 0,
					transition: "color 0.3s",
					"&:hover": {
						color: "black",
					},
				},
				"> input": {
					width: "85%",
					borderRadius: "4px",
					fontSize: "12px",
					background: "transparent",
					"&:focus": {
						border: "1px solid transparent",
					},
				},
			},
			"> div.edit-btns": {
				height: "65%",
				...flex(["justifyContent"]),
				justifyContent: "flex-end",
				paddingRight: "10px",
				flex: "0.2",
				"> button": {
					...flex(["justifyContent"]),
					justifyContent: "space-between",
					height: "100%",
					width: "70px",
					fontSize: "14px",
					padding: "0 10px",
					borderRadius: "4px",
					border: "none",
					outline: "none",
					lineHeight: "19.83px",
					weight: "500",
					"&.cancel": {
						background: "rgba(255, 102, 114, 0.05)",
						color: "#FF6672",
						marginLeft: "10px",
					},
					"&.submit": { background: "rgba(44, 218, 155, 0.15)", color: "#2CDA9B" },
				},
			},
		},
	};
});
