import { SERVICE_ERR, ADD_SERVICE, DELETE_SERVICE, EDIT_SERVICE, GET_SERVICE, GET_SERVICES } from '../actionTypes';

const authReducer = (state = { msg: null, error: null, service: {}, services: [] }, action) => {
	switch (action.type) {
		case ADD_SERVICE:
			return { ...state, msg: action.payload };
		case GET_SERVICES:
			return { ...state, services: action.payload };
		case GET_SERVICE:
			return { ...state, service: action.payload };
		case DELETE_SERVICE:
			return { ...state, services: action.payload };
		case EDIT_SERVICE:
			return { ...state, service: action.payload };
		case SERVICE_ERR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default authReducer;
