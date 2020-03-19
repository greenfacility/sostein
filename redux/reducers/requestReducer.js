import {
	ADD_REQUEST,
	DELETE_REQUEST,
	GET_REQUEST,
	GET_REQUESTS,
	CHANGE_REQUEST_STATUS,
	REQUEST_ERR,
} from '../actionTypes';

const authReducer = (state = { requests: [], request: {}, message: null, error: null }, action) => {
	switch (action.type) {
		case ADD_REQUEST:
			return { ...state, requests: action.payload };
		case GET_REQUESTS:
			return { ...state, requests: action.payload };
		case GET_REQUEST:
			return { ...state, request: action.payload };
		case DELETE_REQUEST:
			return { ...state, message: action.payload };
		case CHANGE_REQUEST_STATUS:
			return { ...state, request: action.payload };
		case REQUEST_ERR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default authReducer;
