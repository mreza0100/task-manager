import { combineReducers } from "redux";
import isPlusMode from "./plus";
import profile from "./profile";
import tasks from "./tasks";
import people from "./people";

const combinedReducer = combineReducers({
	isPlusMode,
	profile,
	tasks,
	people,
});

export default combinedReducer;
