import {
	ADD_REQUEST,
	DELETE_REQUEST,
	GET_REQUEST,
	GET_REQUESTS,
	CHANGE_REQUEST_STATUS,
	REQUEST_ERR,
	GET_OUTREQUEST,
	GET_OUTREQUESTS,
	OUTREQUEST_ERR,
} from '../actionTypes';

const authReducer = (
	state = { requests: [], request: {}, outrequests: [], outrequest: {}, message: null, error: null, outerror: null },
	action,
) => {
	switch (action.type) {
		case ADD_REQUEST:
			return { ...state, requests: action.payload };
		case GET_REQUESTS:
			return { ...state, requests: action.payload };
		case GET_OUTREQUEST:
			return { ...state, outrequest: action.payload };
		case GET_OUTREQUESTS:
			return { ...state, outrequests: action.payload };
		case GET_REQUEST:
			return { ...state, request: action.payload };
		case DELETE_REQUEST:
			return { ...state, message: action.payload };
		case CHANGE_REQUEST_STATUS:
			return { ...state, request: action.payload };
		case REQUEST_ERR:
			return { ...state, error: action.payload };
		case OUTREQUEST_ERR:
			return { ...state, outerror: action.payload };
		default:
			return state;
	}
};

export default authReducer;
