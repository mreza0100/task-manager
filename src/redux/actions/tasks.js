import { _USE_API_ } from "../../api/index.API";
import { SET_TASKS, SET_TASK } from "../type";

export const getTasks = payload => async (dispatch, getState) => {
	const { req, res } = payload ?? {};

	const APIResponse = await _USE_API_({
		// baseURL: "http://localhost:10000",
		res,
		req,
		isPrivetRoute: true,
		describe: "getting all tasks from server",
	}).Get({
		// url: "/api/getTasks",
		url: "/tasks",
	});
	dispatch({
		// payload: APIResponse.data,
		type: SET_TASKS,
		payload: APIResponse.data.data.list,
	});
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
			describe: "getting one task with ID and over write it in store",
		}).Get({
			url: "/tasks",
			params: { id: taskID },
		});

		if (res.status === 200) {
			const newTask = res.data.data.item;
			const newTasks = tasks.map(task => (task.id === newTask.id ? newTask : task));
			dispatch({ type: SET_TASKS, payload: newTasks });
		}
	} catch (err) {
		console.dir(err);
	}
};

export const getOneFromState = payload => (dispatch, getState) => {
	const { taskID } = payload;
	const { tasks } = getState();
	return tasks.find(task => task.id === taskID);
};

export const shock = payload => (dispatch, getState) => {
	const { tasks } = getState();
	dispatch({ type: SET_TASKS, payload: tasks });
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
	} catch (err) {
		console.dir(err);
	}
};
