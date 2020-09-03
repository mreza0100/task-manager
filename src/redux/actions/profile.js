import { SET_PROFILE } from "../type";
import { _USE_API_ } from "../../api/index.API";

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
	} catch (err) {}
	// name
	// family
	// email
	// userID
	// mobile
};
