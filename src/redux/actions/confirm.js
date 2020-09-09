import { SET_CONFIRM_NUM } from "../type";

export const setConfirmNum = payload => (dispatch, getState) => {
	const { mobile } = payload;
	console.log(mobile);
	dispatch({ type: SET_CONFIRM_NUM, payload: mobile });
	console.log("action", getState());
};

export const clearConfirmNum = payload => (dispatch, getState) => {
	dispatch({ type: SET_CONFIRM_NUM, payload: null });
};
