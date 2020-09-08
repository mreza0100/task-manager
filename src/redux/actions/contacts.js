import {
	SET_CONTACTS,
	ADD_TO_CONTACTS,
	DELETE_CONTACTS,
	ADD_TO_SELECTED_CONTACTS,
	SET_SELECTED_CONTACTS,
} from "../type.js";
import { _USE_API_ } from "../../api/index.API";
import { reloadRouter } from "../../helpers/exports";

/* 
	const APIResponse = await _USE_API_({
		res,
		req,
		isPrivetRoute: false,
		describe: "getting peolpe(contacts) data",
		debug: false,
		baseURL: "http://localhost:10000/",
	}).Get({ url: "/api/contacts" });
	const contacts = APIResponse.data;
	dispatch({ type: SET_CONTACTS, payload: contacts });
*/

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
	const { inputData, resetForm } = payload;

	const { name, mobile } = inputData;
	const data = { name, mobile, pic: "" };

	try {
		const res = await _USE_API_({
			describe: "add a peolpe(contacts) to db",
			isPrivetRoute: true,
			debug: false,
		}).Post({ url: "/people", data });
		const { id } = res.data.data.item;
		if (id && res.status === 200) {
			if (resetForm) resetForm();
			reloadRouter();
			dispatch({ type: ADD_TO_CONTACTS, payload: { ...data, id } });
		}
	} catch (err) {}
};

export const deleteContact = payload => async (dispatch, getState) => {
	const { contactID } = payload;
	const data = { id: contactID };
	try {
		const res = await _USE_API_({
			describe: "deleting a contact",
			isPrivetRoute: true,
			debug: false,
		}).Delete({
			url: "/people",
			data,
		});
		if (res.status === 200) {
			reloadRouter();
			// removing contactID from selectedContacts maybe it was a selected contact
			const { selectedContacts } = getState().contacts;
			const filtredContacts = selectedContacts.filter(
				selectedContactID => selectedContactID !== contactID
			);
			dispatch({ type: SET_SELECTED_CONTACTS, payload: filtredContacts });
		}
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

export const toggleSelectedContact = payload => (dispatch, getState) => {
	const { contactID, selected } = payload;
	// if its not selected im just adding it to end if the list
	if (!selected) return dispatch({ type: ADD_TO_SELECTED_CONTACTS, payload: contactID });

	// else filtering all selectedContacts to remove it from array
	const { selectedContacts } = getState().contacts;
	const filtredContacts = selectedContacts.filter(selectedContactID => selectedContactID !== contactID);
	dispatch({ type: SET_SELECTED_CONTACTS, payload: filtredContacts });
};

export const toggleSelectAllContacts = payload => (dispatch, getState) => {
	const { allContacts, selectedContacts } = getState().contacts;
	if (allContacts.length === selectedContacts.length) {
		return dispatch({ type: SET_SELECTED_CONTACTS, payload: [] });
	}
	const selectedContactListID = allContacts.map(contact => contact.id);
	dispatch({ type: SET_SELECTED_CONTACTS, payload: selectedContactListID });
};
