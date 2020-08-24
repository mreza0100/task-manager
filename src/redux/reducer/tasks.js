import { SET_TASKS, SET_TASK } from "../type";

export default function tasskReducer(state = false, action) {
	switch (action.type) {
		case SET_TASKS:
			return action.payload;
		case SET_TASK:
			return [action.payload, ...state];
		default:
			return state;
	}
}
