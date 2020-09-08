import { deleteContact, toggleSelectedContact } from "../redux/actions/contacts";
import { StyledCheckBox } from "./task/CheckBox";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function ContactComponent({ data, selected }) {
	const { name, mobile, id: contactID } = data;
	const dispatch = useDispatch();

	return (
		<Contact>
			<div className="name">{name}</div>
			<a href={`tel:${mobile}`}>{mobile}</a>
			<div className="controllers">
				<i className="icon-pen" />
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

const Contact = styled.div(({ theme: { flex, $white, $blueTxt } }) => {
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
				textAlign: "right",
			},
		},
		"> a": {
			flex: 0.2,
			color: "#5460FE",
			cursor: "pointer",
			textAlign: "right",
		},
		".controllers": {
			...flex(["justifyContent"]),
			justifyContent: "flex-end",
			"> i.icon-trash": { color: "#FF6672", cursor: "pointer" },
			"> i.icon-pen": { color: $blueTxt, cursor: "pointer" },
			"> *": {
				margin: "0 15px",
			},
		},
	};
});
