import { TOGGLE_PLUS } from "../type";

export const togglePlus = payload => (dispatch, getState) => {
	const { isPlusMode } = getState();
	dispatch({ type: TOGGLE_PLUS, payload: !isPlusMode });
};
