import { EDIT_PROFILE, SET_PROFILE } from "../type";

export default function profileReducer(state = {}, action) {
	switch (action.type) {
		case SET_PROFILE:
			return action.payload;
		case EDIT_PROFILE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
