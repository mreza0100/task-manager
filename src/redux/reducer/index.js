import { combineReducers } from "redux";
import isPluseMode from "./pluse";
import profile from "./profile";
import tasks from "./tasks";
import people from "./people";

const combinedReducer = combineReducers({
	isPluseMode,
	profile,
	tasks,
	people,
});

export default combinedReducer;
