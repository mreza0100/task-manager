import { SET_CONTACTS, ADD_CONTACTS } from "../type";

export default function contactsReducer(state = [], action) {
	switch (action.type) {
		case SET_CONTACTS:
			return action.payload;
		case ADD_CONTACTS:
			return [action.payload, ...state];
		default:
			return state;
	}
}
