import { combineReducers } from "redux";
import weather from "./weather";
import auth from "./auth";
export const reducers = combineReducers({
	weather,
	auth,
});
