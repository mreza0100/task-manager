import {
	SET_CONTACTS,
	ADD_TO_CONTACTS,
	DELETE_CONTACTS,
	ADD_TO_SELECTED_CONTACTS,
	SET_SELECTED_CONTACTS,
	SET_ANY_CONTACT_SELECTED_BOOLEAN,
} from "../type";

export default function contactsReducer(
	state = { allContacts: [], selectedContacts: [], anyContactIsSelected: false },
	action
) {
	switch (action.type) {
		case SET_CONTACTS:
			return {
				...state,
				allContacts: action.payload,
			};
		case ADD_TO_CONTACTS:
			return {
				...state,
				allContacts: [action.payload, ...state.allContacts],
			};
		case ADD_TO_SELECTED_CONTACTS:
			return {
				...state,
				selectedContacts: [action.payload, ...state.selectedContacts],
				anyContactIsSelected: true,
			};
		case SET_SELECTED_CONTACTS:
			return {
				...state,
				selectedContacts: action.payload,
				anyContactIsSelected: !!action.payload.length,
			};
		case DELETE_CONTACTS:
			return { allContacts: [], selectedContacts: [], anyContactIsSelected: false };

		default:
			return state;
	}
}
