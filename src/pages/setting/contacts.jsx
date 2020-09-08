import { addContacts, getContacts, toggleSelectAllContacts } from "../../redux/actions/contacts";
import useFilteringContacts from "../../hooks/filteringContacts";
import DropDownMenu from "../../components/DropDownMenu";
import SettingLayout from "../../layout/Setting.layout";
import { useDispatch, useSelector } from "react-redux";
import { phoneRegExp } from "../../helpers/exports";
import Contact from "../../components/Contact";
import { Field, Form, Formik } from "formik";
import { DropDownItem } from "../index";
import styled from "styled-components";
import { TopContents } from "../index";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object({
	name: yup.string().required().trim(),
	mobile: yup.string().matches(phoneRegExp, "Phone number is not valid").trim().required(),
});

export default function Contacts() {
	const [searchText, setSearchText] = useState("");
	const contacts = useSelector(({ contacts }) => contacts);
	const dispatch = useDispatch();

	const onChangeSearch = ({ target }) => {
		setSearchText(target.value);
	};

	const filteredContacts = useFilteringContacts(contacts, { searchText });

	return (
		<SettingLayout>
			<TopContents>
				<h1>
					<i className="icon-miz-logo" />
					<span>پروژه میز - پروفایل / مخاطبین</span>
				</h1>
				<TopLeftWrapper>
					<Search>
						<input type="text" value={searchText} onChange={onChangeSearch} />
						<i className="fa fa-search" />
					</Search>
					<DropDownMenu title="اکشن ها">
						<DropDownItem onClick={() => dispatch(toggleSelectAllContacts())}>
							انتخاب همه
						</DropDownItem>
						<DropDownItem>حذف همه</DropDownItem>
					</DropDownMenu>
				</TopLeftWrapper>
			</TopContents>
			<AddContact>
				<Formik
					validationSchema={schema}
					initialValues={{ name: "", mobile: "" }}
					onSubmit={(inputData, { resetForm }) => {
						dispatch(addContacts({ inputData, resetForm }));
					}}
				>
					{() => {
						return (
							<Form>
								<Field name="name" placeholder="نام و نام خانوادگی" />
								<Field name="mobile" placeholder="شماره تماس" />
								<button type="submit">
									<i className="icon-plus" />
									افزوردن مخاطب
								</button>
							</Form>
						);
					}}
				</Formik>
			</AddContact>
			<ContactsWrapper>
				{filteredContacts.map(contactData => {
					const selected = contacts.selectedContacts.includes(contactData.id);
					return <Contact key={contactData.id} data={contactData} selected={selected} />;
				})}
			</ContactsWrapper>
		</SettingLayout>
	);
}

Contacts.getInitialProps = async ({ store: { dispatch }, req, res }) => {
	await dispatch(getContacts({ req, res }));
};

const TopLeftWrapper = styled.div(({ theme: { flex } }) => {
	return {
		...flex(),
	};
});

const Search = styled.div(props => {
	return {
		position: "relative",
		marginLeft: "15px",
		"> input": {
			outline: "none",
			border: "none",
			background: "#FFFFFF",
			border: "1px solid #DADADA",
			borderRadius: "4px",
			padding: "10px",
			fontSize: "12px",
		},
		"> i": {
			color: "#6FA0F1 ",
			position: "absolute",
			top: "10px",
			left: "10px",
		},
	};
});

const ContactsWrapper = styled.div(({ theme: { flex } }) => {
	return {
		...flex(),
		flexDirection: "column",
		marginTop: "20px",
	};
});

const AddContact = styled.div(({ theme: { flex, $bolderBlue, $white } }) => {
	return {
		...flex(),
		width: "100%",
		height: "50px",
		form: {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			width: "100%",
			height: "100%",
			input: {
				width: "38%",
				height: "100%",
				padding: "10px",
				borderRadius: "4px",
				background: $white,
				border: "1px solid #DADADA",
				"&::placeholder": { fontSize: "14px" },
				"&:focus": {
					outline: "none",
				},
			},
			button: {
				...flex(["justifyContent"]),
				justifyContent: "space-evenly",
				height: "100%",
				fontSize: "14px",
				color: $white,
				border: "none",
				borderRadius: "4px",
				backgroundColor: $bolderBlue,
				flex: 0.8,
				"&:focus": {
					outline: "none",
				},
			},
		},
	};
});
