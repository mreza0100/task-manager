import { SET_CONFIRM_NUM } from "../type";

export default function confirmReducer(state = null, action) {
	switch (action.type) {
		case SET_CONFIRM_NUM:
			return action.payload;
		default:
			return state;
	}
}
