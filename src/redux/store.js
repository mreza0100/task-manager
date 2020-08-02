import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import combinedReducer from "./reducer";
import logger from "./logger.redux";
import thunk from "redux-thunk";

const reducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		default:
			return combinedReducer(state, action);
	}
};

const makeStore = ctx => {
	const store = createStore(reducer, applyMiddleware(thunk, logger));
	if (module.hot) module.hot.accept("./reducer", () => store.replaceReducer(require("./reducer").default));
	return store;
};

export const wrapper = createWrapper(makeStore);
