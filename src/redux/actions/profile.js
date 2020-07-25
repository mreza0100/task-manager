import { CHANGE_TASKS_FIGURE, SET_TASKS, SET_PROFILE } from "../type";
import { _USE_API_ } from "../../api/index.API";

export const changeTasksFigure = payload => (dispatch, getState) => {
	const { figure } = payload;
	if (!figure) throw new Error("figure is undifined");
	dispatch({ type: CHANGE_TASKS_FIGURE, payload: figure });
};

export const toggleTasksFigure = payload => (dispatch, getState) => {
	const { tasksFigure } = getState().profile;
	const figure = tasksFigure === "table" ? "line" : "table";
	dispatch({ type: CHANGE_TASKS_FIGURE, payload: figure });
};

export const setProfile = payload => (dispatch, getState) => {
	const { name, family, email, userID } = payload;
	// ! mobile tasksFigure
	const profileData = { name, family, email, userID, tasksFigure: "table", mobile: "09361719102" };
	dispatch({ type: SET_PROFILE, payload: profileData });
};

export const getProfileAndTasks = payload => async (dispatch, getState) => {
	const { req, res } = payload ?? {};
	const APIResponse = await _USE_API_({
		res,
		req,
		isPrivetRoute: true,
		describe: "getting all tasks and profile",
	}).Get({
		url: "/profile",
	});

	dispatch({ type: SET_TASKS, payload: APIResponse.data.data.item.tasks });
	const { name, family, email, id: userID } = APIResponse.data.data.item;
	// ! mobile tasksFigure
	dispatch(setProfile({ name, family, email, userID }));
};
