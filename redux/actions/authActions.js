// actions/authActions.js
import cookie from 'react-cookies';
import Router from 'next/router';
import { Message } from 'antd';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE, REGISTER, USERINFO, AUTH_ERROR } from '../actionTypes';

export const authenticate = (user) => (dispatch) => {
	// console.log(user);
	axios
		.post('/api/user', user)
		.then((response) => {
			// console.log('ok set cookie', response.status);
			setCookie('token', response.data.token);
			Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: USERINFO, payload: response.data.user });
			dispatch({ type: AUTHENTICATE, payload: response.data.token });
		})
		.catch((err) => {
			console.log(err.response.data);
			Message.error(err.response.data.msg);
			return dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
		});
};

export const deauthenticate = () => {
	return (dispatch) => {
		removeCookie('token');
		Router.push('/signin');
		dispatch({ type: DEAUTHENTICATE });
	};
};

export const register = (user) => (dispatch) => {
	// console.log(user);
	axios
		.put('/api/user', user)
		.then((response) => {
			// console.log('ok set cookie', response.status);
			setCookie('token', response.data.token);
			Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: USERINFO, payload: response.data.user });
			dispatch({ type: AUTHENTICATE, payload: response.data.token });
			dispatch({ type: REGISTER, payload: response.data.token });
		})
		.catch((err) => {
			console.log(err.response.data);
			Message.error(err.response.data.msg);
			return dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
		});
};

export const editProfile = (user, id) => (dispatch) => {
	const token = getCookie('token');

	axios
		.patch(`/api/user/${id}`, user, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((response) => {
			// console.log('ok set cookie', response.token);
			// console.log(response);
			if (response.data.success) {
				Message.success('Profile Updated');
				return dispatch(getUser(token));
			}
			Message.error(response.data.msg);
			return;
			// .then(() => Router.push('/dashboard'));
		})
		.catch((err) => {
			console.log(err);
			return Message.error(err.response.data.msg);
		});

	// console.log(user);
};

export const getUser = (token) => (dispatch) => {
	if (!token) return null;
	axios
		.get(`/api/user`, {
			headers: {
				Authorization: `${token}`,
			},
		})
		.then((response) => {
			dispatch({ type: AUTHENTICATE, payload: response.data.token });
			dispatch({ type: USERINFO, payload: response.data.user });
			return { loaded: true };
		})
		.catch((err) => console.log(err.response.data));
};

export const getUserLocal = async (token) => {
	// console.log(token);
	if (!token) return null;
	const res = await axios.get(`/api/user`, {
		headers: {
			Accept: 'application/json',
			Authorization: `${token}`,
		},
	});
	const user = await res.data;
	// console.log(user);
	return user;
};

export const loadUser = async (username, users) => {
	const user = users.find((data) => data.username === username);
	return user;
};

/**
 * cookie helper methods
 */

export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.save(key, value, {
			path: '/',
		});
	}
};

export const removeCookie = (key) => {
	if (process.browser) {
		cookie.remove(key);
	}
};

export const getCookie = (key, req) => {
	return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
	return cookie.load(key);
};

const getCookieFromServer = (key, req) => {
	if (!req.headers.cookie) {
		return undefined;
	}
	const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));
	if (!rawCookie) {
		return undefined;
	}
	return rawCookie.split('=')[1];
};
