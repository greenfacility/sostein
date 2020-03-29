import {
	BTNLOADING,
	LOCATIONOC,
	PROPERTYOC,
	REQUESTOC,
	SERVICEOC,
	USEROC,
	LOCATIONOC2,
	PROPERTYOC2,
	REQUESTOC2,
	REQUESTOC3,
	SERVICEOC2,
	USEROC2,
} from '../actionTypes';

const uxReducer = (
	state = {
		loading: false,
		locationopen: false,
		propertyopen: false,
		requestopen: false,
		serviceopen: false,
		useropen: false,
		locationopen2: false,
		propertyopen2: false,
		requestopen2: false,
		requestopen3: false,
		serviceopen2: false,
		useropen2: false,
	},
	action,
) => {
	switch (action.type) {
		case BTNLOADING:
			return { ...state, loading: action.payload };
		case LOCATIONOC:
			return { ...state, locationopen: !state.locationopen };
		case PROPERTYOC:
			return { ...state, propertyopen: !state.propertyopen };
		case REQUESTOC:
			return { ...state, requestopen: !state.requestopen };
		case SERVICEOC:
			return { ...state, serviceopen: !state.serviceopen };
		case USEROC:
			return { ...state, useropen: !state.useropen };
		case LOCATIONOC2:
			return { ...state, locationopen2: !state.locationopen2 };
		case PROPERTYOC2:
			return { ...state, propertyopen2: !state.propertyopen2 };
		case REQUESTOC2:
			return { ...state, requestopen2: !state.requestopen2 };
		case REQUESTOC3:
			return { ...state, requestopen3: !state.requestopen3 };
		case SERVICEOC2:
			return { ...state, serviceopen2: !state.serviceopen2 };
		case USEROC2:
			return { ...state, useropen2: !state.useropen2 };
		default:
			return state;
	}
};

export default uxReducer;
