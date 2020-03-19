// redux/index.js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';

export const makeStore = (initialState, options) => {
	return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};
