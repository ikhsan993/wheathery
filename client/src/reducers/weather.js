import {
	SEARCH,
	START_LOADING,
	END_LOADING,
	HISTORY
} from "../constants/actionTypes";

const initialState = { isLoading: true, weather: {}, history:[] };

const weatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case END_LOADING:
			return {
				...state,
				isLoading: false,
			};
		case SEARCH:
			return {
				...state,
				weather: action?.payload,
			};
		case HISTORY:
			return {
				...state,
				history: action?.payload,
			};
		default:
			return state;
	}
};

export default weatherReducer;
