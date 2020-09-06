import { SET_CONTACTS, ADD_CONTACTS, DELETE_CONTACTS } from "../type.js";
import { _USE_API_ } from "../../api/index.API";
import { reloadRouter } from "../../helpers/exports";

export const getContacts = payload => async (dispatch, getState) => {
	const { req, res } = payload ?? {};
	try {
		const APIResponse = await _USE_API_({
			res,
			req,
			isPrivetRoute: true,
			describe: "getting peolpe(contacts) data",
			debug: false,
		}).Get({ url: "/people" });
		const contacts = APIResponse.data.data.list;
		dispatch({ type: SET_CONTACTS, payload: contacts });
	} catch (err) {}
};

export const addContacts = payload => async (dispatch, getState) => {
	const { name, mobile } = payload;
	const data = { name, mobile, pic: "" };
	try {
		const res = await _USE_API_({
			describe: "add a peolpe(contacts) to db",
			isPrivetRoute: true,
			debug: false,
		}).Post({ url: "/people", data });
		const { id } = res.data.data.item;
		if (id && res.status === 200) dispatch({ type: ADD_CONTACTS, payload: { ...data, id } });
	} catch (err) {}
};

export const deleteContact = payload => async (dispatch, getState) => {
	const { contactID } = payload;
	const data = { id: contactID };
	try {
		const res = await _USE_API_({
			describe: "deleting a contact",
			isPrivetRoute: true,
			debug: true,
		}).Delete({
			url: "/people",
			data,
		});
		if (res.status === 200) reloadRouter();
	} catch (err) {}
};

export const editContact = payload => async (dispatch, getState) => {
	const data = payload;
	try {
		const res = await _USE_API_({
			describe: "deleting a contact",
			isPrivetRoute: true,
			debug: true,
		}).Put({
			url: "/people",
			data,
		});
		if (res.status === 200) reloadRouter();
	} catch (err) {}
};
