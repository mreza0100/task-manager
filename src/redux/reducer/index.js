import { combineReducers } from "redux";
import contacts from "./contacts";
import isPlusMode from "./plus";
import profile from "./profile";
import tasks from "./tasks";

const combinedReducers = combineReducers({
	isPlusMode,
	profile,
	tasks,
	contacts,
});

export default combinedReducers;
