import { CHANGE_TASKS_FIGURE } from "../type";

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
