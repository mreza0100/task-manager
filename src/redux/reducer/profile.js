import { CHANGE_TASKS_FIGURE } from "../type";

const initialState = {
	tasksFigure: "table",
};
// TODO: change this to false and dispatch initial with getting API
export default function (state = initialState, action) {
	switch (action.type) {
		case CHANGE_TASKS_FIGURE:
			return { ...state, tasksFigure: action.payload };
		default:
			return state;
	}
}
