import * as api from "../api";
import {
	SEARCH,
	START_LOADING,
	END_LOADING,
	HISTORY
} from "../constants/actionTypes";

// Action Creator

export const getDataWeather = (search) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.getDataWeather(search);
		dispatch({ type: SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getHistory = () => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.getHistory();
		dispatch({ type: HISTORY, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};
