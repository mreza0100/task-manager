import { CHANGE_TASKS_FIGURE, SET_PROFILE } from "../type";

export default function (state = {}, action) {
	switch (action.type) {
		case CHANGE_TASKS_FIGURE:
			return { ...state, tasks_figure: action.payload };
		case SET_PROFILE:
			return action.payload;
		default:
			return state;
	}
}
