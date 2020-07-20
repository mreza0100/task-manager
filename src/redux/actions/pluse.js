import { TOGGLE_PLUSE } from "../type";

export const togglePluse = payload => (dispatch, getState) => {
	const { isPluseMode } = getState();
	dispatch({ type: TOGGLE_PLUSE, payload: !isPluseMode });
};
