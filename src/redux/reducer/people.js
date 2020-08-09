import { SET_PEOPLE, ADD_PEOPLE } from "../type";

export default function (state = [], action) {
	switch (action.type) {
		case SET_PEOPLE:
			return action.payload;
		case ADD_PEOPLE:
			return [action.payload, ...state];
		default:
			return state;
	}
}
