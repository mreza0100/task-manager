import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import combinedReducer from "./reducer";
import getLogger from "./logger.redux";
import thunk from "redux-thunk";

const reducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		default:
			return combinedReducer(state, action);
	}
};

const debug = false;

const makeStore = ctx => {
	const store = debug
		? createStore(reducer, applyMiddleware(thunk, getLogger()))
		: createStore(reducer, applyMiddleware(thunk));
	if (module.hot)
		module.hot.accept("./reducer", () => store.replaceReducer(require("./reducer").default));
	return store;
};

export const wrapper = createWrapper(makeStore);
