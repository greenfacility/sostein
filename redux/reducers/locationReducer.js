import {
	LOCATION_ERR,
	ADD_LOCATION,
	DELETE_LOCATION,
	EDIT_LOCATION,
	GET_LOCATION,
	GET_LOCATIONS,
} from '../actionTypes';

const locationReducer = (state = { msg: null, error: null, location: {}, locations: [] }, action) => {
	switch (action.type) {
		case ADD_LOCATION:
			return { ...state, msg: action.payload };
		case GET_LOCATIONS:
			return { ...state, locations: action.payload };
		case GET_LOCATION:
			return { ...state, location: action.payload };
		case DELETE_LOCATION:
			return { ...state, locations: action.payload };
		case EDIT_LOCATION:
			return { ...state, location: action.payload };
		case LOCATION_ERR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default locationReducer;
