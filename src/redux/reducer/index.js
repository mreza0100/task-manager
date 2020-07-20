import { combineReducers } from "redux";
import isPluseMode from "./pluse";
import profile from "./profile";
import tasks from "./tasks";

const combinedReducer = combineReducers({
	isPluseMode,
	profile,
	tasks,
});

export default combinedReducer;
