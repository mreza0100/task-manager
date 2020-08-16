import { EDIT_PROFILE, SET_PROFILE } from "../type";
import { _USE_API_ } from "../../api/index.API";

export const changeTasksFigure = payload => async (dispatch, getState) => {
	const { figure: tasks_figure } = payload;
	dispatch({ type: EDIT_PROFILE, payload: { tasks_figure } });

	try {
		await _USE_API_({
			describe: "changing tasksFigure",
			isPrivetRoute: true,
		}).Put({
			url: "/profile",
			data: { tasks_figure },
		});
	} catch (err) {
		const { tasks_figure: currentFigure } = getState().profile;
		const tasks_figure = currentFigure === "line" ? "table" : "line";
		dispatch({ type: EDIT_PROFILE, payload: { tasks_figure } });
	}
};

export const getProfileData = payload => async (dispatch, getState) => {
	const { req, res, fields } = payload ?? { fields: [] };
	try {
		const APIResponse = await _USE_API_({
			res,
			req,
			isPrivetRoute: true,
			describe: "getting profile data",
			debug: false,
		}).Get({
			url: "/profile",
			params: { fields: JSON.stringify(fields) },
		});
		dispatch({ type: SET_PROFILE, payload: APIResponse.data.data.item });
	} catch (err) {
		// throw Error("NEtwork Error>>: ", err);
	}
	// name,
	// family,
	// email,
	// userID,
	// mobile,
	// tasksFigure
};
