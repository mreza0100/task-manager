import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import combinedReducer from "./reducer";
import thunk from "redux-thunk";
import logger from "./logger.redux";

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		// action.payload.posts && delete action.payload.posts;
		return {
			...state,
			...action.payload,
		};
	} else return combinedReducer(state, action);
};

export const makeStore = () => createStore(reducer, applyMiddleware(thunk, logger));

export const wrapper = createWrapper(makeStore);
