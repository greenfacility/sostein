import { REQUESTING } from '../actionTypes';

const uxReducer = (state = { btnloading: false }, action) => {
	switch (action.type) {
		case REQUESTING:
			return { ...state, btnloading: !state.btnloading };
		default:
			return state;
	}
};

export default uxReducer;
