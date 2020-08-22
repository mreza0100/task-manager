import { HYDRATE } from "next-redux-wrapper";
import { createLogger } from "redux-logger";
import * as types from "./type";

export default function getLogger() {
	const allowTypesForLog = { ...types };
	const deniedTypesForLog = {};
	const colors = {
		action: () => "#2aaf99f3",
		prevState: () => "#e20ebf",
		error: () => "red",
		nextState: () => "#a1ca0a",
		title: () => "#7be624",
	};
	const collapsed = (getState, action, logEntry) => {};
	const diff = true; // changes between states
	const predicate = (getState, action) => {
		/*returning a boolian for log permission*/
		const { type } = action;
		if (type === HYDRATE) return false;
		if (!allowTypesForLog[type]) return false;
		if (deniedTypesForLog[type]) return false;
		return true;
	};

	return createLogger({
		predicate,
		collapsed,
		colors,
		diff,
	});
}
