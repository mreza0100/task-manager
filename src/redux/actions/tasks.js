import { _USE_API_ } from "../../api/index.API";
import { SET_TASKS, SET_TASK } from "../type";

export const getTasks = payload => async (dispatch, getState) => {
	const { req, res } = payload ?? {};

	try {
		const APIResponse = await _USE_API_({
			res,
			req,
			isPrivetRoute: true,
			describe: "getting all tasks from server",
		}).Get({ url: "/tasks" });
		if (APIResponse.status === 200) {
			const payload = APIResponse.data.data.list;
			dispatch({ type: SET_TASKS, payload });
		}
	} catch (err) {}
};

export const editTask = payload => (dispatch, getState) => {
	const { newTask } = payload;
	const { tasks } = getState();
	const newTasks = tasks.map(task => {
		// if (task.id === newTask.id) console.log({ ...task, ...newTask });
		return task.id === newTask.id ? { ...task, ...newTask } : task;
	});
	dispatch({ type: SET_TASKS, payload: newTasks });
};

export const getOneAndOverwrite = payload => async (dispatch, getState) => {
	const { taskID } = payload;
	const { tasks } = getState();
	try {
		const res = await _USE_API_({
			isPrivetRoute: true,
			pendingID: taskID,
			describe: "getting one task with ID and over write it in state",
		}).Get({
			url: "/tasks",
			params: { id: taskID },
		});

		if (res.status === 200) {
			const newTask = res.data.data.item;
			const newTasks = tasks.map(task => (task.id === newTask.id ? newTask : task));
			dispatch({ type: SET_TASKS, payload: newTasks });
		}
	} catch (err) {}
};

export const getOneTask = payload => async (dispatch, getState) => {
	const { taskID } = payload;
	try {
		const res = await _USE_API_({
			isPrivetRoute: true,
			debug: false,
			describe: "getting one new task and add to store",
		}).Get({
			url: "/tasks",
			params: { id: taskID },
		});

		if (res.status === 200) {
			const newTask = res.data.data.item;
			dispatch({ type: SET_TASK, payload: newTask });
		}
	} catch (err) {}
};
