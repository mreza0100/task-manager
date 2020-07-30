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
	const profileData = {
		name,
		family,
		email,
		userID,
		tasksFigure: "line",
		mobile: "09361719102",
	};
	dispatch({ type: SET_PROFILE, payload: profileData });
};

export const getProfileAndTasks = payload => async (dispatch, getState) => {
	const { req, res } = payload ?? {};
	try {
		const APIResponse = await _USE_API_({
			res,
			req,
			isPrivetRoute: true,
			describe: "getting all tasks and profile",
		}).Get({
			url: "/profile",
		});
		console.log(APIResponse.data);
		console.log(APIResponse.data.data.tasks);

		dispatch({ type: SET_TASKS, payload: APIResponse.data.data.item.tasks });
		const { name, family, email, id: userID } = APIResponse.data.data.item;
		// ! mobile tasksFigure
		dispatch(setProfile({ name, family, email, userID }));
	} catch (err) {
		const APIResponse = await _USE_API_({
			res,
			req,
			isPrivetRoute: false,
			describe: "getting all tasks and profile FROM INTERNAL SERVER",
			baseURL: "http://localhost:10000",
		}).Get({
			url: "/api/getTasks",
		});

		dispatch({ type: SET_TASKS, payload: APIResponse.data });
		// const { name, family, email, id: userID } = APIResponse.data;
		// ! mobile tasksFigure
		// dispatch(setProfile({ name, family, email, userID }));
	}
};
