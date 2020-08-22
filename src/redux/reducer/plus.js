import { TOGGLE_PLUS } from "../type";

export default function (state = false, action) {
	switch (action.type) {
		case TOGGLE_PLUS:
			return action.payload;
		default:
			return state;
	}
}
