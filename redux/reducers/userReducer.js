import { USER_ERROR, USERSINFO, EDITUSERINFO } from '../actionTypes';

const userReducer = (state = { edit: {}, error: null, users: [] }, action) => {
	switch (action.type) {
		case USERSINFO:
			return { ...state, users: action.payload };
		case USER_ERROR:
			return { ...state, error: action.payload };
		case EDITUSERINFO:
			return { ...state, edit: action.payload };
		default:
			return state;
	}
};

export default userReducer;
