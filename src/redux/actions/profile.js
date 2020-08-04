import { CHANGE_TASKS_FIGURE, SET_PROFILE } from "../type";
import { _USE_API_ } from "../../api/index.API";

export const changeTasksFigure = payload => (dispatch, getState) => {
	const { figure } = payload;
	if (!figure) throw new Error("figure is undifined");
	dispatch({ type: CHANGE_TASKS_FIGURE, payload: figure });
};

export const toggleTasksFigure = payload => (dispatch, getState) => {
	const { tasks_figure } = getState().profile;
	const figure = tasks_figure === "table" ? "line" : "table";
	dispatch({ type: CHANGE_TASKS_FIGURE, payload: figure });
};

export const getProfileData = payload => async (dispatch, getState) => {
	const { req, res, whatIWant } = payload ?? { whatIWant: [] };
	try {
		const APIResponse = await _USE_API_({
			res,
			req,
			isPrivetRoute: true,
			describe: "getting all tasks and profile",
		}).Get({
			url: "/profile",
			params: whatIWant,
		});
		// name,
		// family,
		// email,
		// userID,
		// ! mobile,
		// ! tasksFigure
		APIResponse.data.data.item["tasks_figure"] = "line";
		dispatch({ type: SET_PROFILE, payload: APIResponse.data.data.item });
	} catch (err) {
		throw Error("NEtwork Error>>: ", err);
	}
};
