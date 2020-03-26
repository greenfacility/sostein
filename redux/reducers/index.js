import { combineReducers } from 'redux';
import authReducer from './authReducer';
import requests from './requestReducer';
import services from './serviceReducer';
import locations from './locationReducer';
import properties from './propertyReducer';
import foruser from './userReducer';
import ux from './uxReducer';
// import { brandFilterReducer } from './brand.filter.reducer';
// import { orderByPriceReducer } from './orderByPrice.filter.reducer';
// import { paginationReducer } from './pagination.reducer';

const rootReducer = combineReducers({
	authentication: authReducer,
	requests,
	services,
	locations,
	properties,
	foruser,
	ux,
	// brandFilter: brandFilterReducer,
	// orderBy: orderByPriceReducer,
	// pagination: paginationReducer,
});

export default rootReducer;
