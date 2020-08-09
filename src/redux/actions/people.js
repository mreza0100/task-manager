const { SET_PEOPLE, ADD_PEOPLE, DELETE_PEOPLE } = require("../type");
import { _USE_API_ } from "../../api/index.API";
import { reloadRouter } from "../../helpers/exports";

export const getPeople = payload => async (dispatch, getState) => {
	const { req, res } = payload ?? {};
	try {
		const APIResponse = await _USE_API_({
			res,
			req,
			isPrivetRoute: true,
			describe: "getting peolpe(contacts) data",
			debug: false,
		}).Get({ url: "/people" });
		dispatch({ type: SET_PEOPLE, payload: APIResponse.data.data.list });
	} catch (err) {}
};

export const addPeople = payload => async (dispatch, getState) => {
	const { name, mobile } = payload;
	const data = { name, mobile, pic: "" };
	try {
		const res = await _USE_API_({
			describe: "add a peolpe(contacts) to db",
			isPrivetRoute: true,
			debug: false,
		}).Post({ url: "/people", data });
		const { id } = res.data.data.item;
		if (id && res.status === 200) dispatch({ type: ADD_PEOPLE, payload: { ...data, id } });
	} catch (err) {
		console.dir(err);
	}
};

export const deleteContact = payload => async (dispatch, getState) => {
	const { contactID } = payload;
	const data = { id: contactID };
	try {
		const res = _USE_API_({ describe: "deleting a contact", isPrivetRoute: true, debug: true }).Delete({
			url: "/people",
			data,
		});
		if (res.status === 200) reloadRouter();
	} catch (err) {
		console.dir(err);
	}
};
