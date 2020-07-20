import { TOGGLE_PLUSE } from "../type";

export default function (state = false, action) {
	switch (action.type) {
		case TOGGLE_PLUSE:
			return action.payload;
		default:
			return state;
	}
}
