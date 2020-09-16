import { combineReducers } from "redux";
import contacts from "./contacts";
import profile from "./profile";
import tasks from "./tasks";

const combinedReducers = combineReducers({
	profile,
	tasks,
	contacts,
});

export default combinedReducers;
