// actions/authActions.js
import cookie from 'react-cookies';
import Router from 'next/router';
import { Message } from 'antd';
import fetch from 'isomorphic-unfetch';
import { AUTHENTICATE, DEAUTHENTICATE, REGISTER, USERINFO, AUTH_ERROR, URL } from '../actionTypes';

export const authenticate = (user) => (dispatch) => {
	// console.log(user);
	fetch(`${URL}/api/user`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((data) => data.json())
		.then((response) => {
			// console.log('ok set cookie', response);
			if (!response.token) {
				Message.error(response.msg);
				return dispatch({ type: AUTH_ERROR, payload: response.msg });
			}
			setCookie('token', response.token);
			Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: USERINFO, payload: response.user });
			dispatch({ type: AUTHENTICATE, payload: response.token });
		})
		.catch((err) => console.log(err));
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
	fetch(`${URL}/api/user`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((data) => data.json())
		.then((response) => {
			// console.log('ok set cookie', response.token);
			// console.log(response);
			if (!response.token) {
				Message.error(response.msg);
				return dispatch({ type: AUTH_ERROR, payload: response.msg });
			}
			setCookie('token', response.token);
			Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: USERINFO, payload: response.user });
			dispatch({ type: REGISTER, payload: response.token });
		})
		.catch((err) => console.log(err));
};

export const editProfile = (user, id) => (dispatch) => {
	const token = getCookie('token');
	// console.log(user);
	fetch(`${URL}/api/user/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(user),
	})
		.then((data) => data.json())
		.then((response) => {
			// console.log('ok set cookie', response.token);
			// console.log(response);
			if (response.success) {
				Message.success('Profile Updated');
				return dispatch(getUser(token));
			}
			Message.error(response.msg);
			return;
			// .then(() => Router.push('/dashboard'));
		})
		.catch((err) => console.log(err));
};

export const getUser = (token) => (dispatch) => {
	if (!token) return null;
	fetch(`${URL}/api/user`, {
		method: 'GET',
		headers: {
			Authorization: `${token}`,
		},
	})
		.then((res) => res.json())
		.then((user) => {
			dispatch({ type: AUTHENTICATE, payload: token });
			dispatch({ type: USERINFO, payload: user });
			return { loaded: true };
		});
};

export const getUserLocal = async (token) => {
	// console.log(token);
	if (!token) return null;
	const res = await fetch(`${URL}/api/user`, {
		// const res = await fetch(`https://greenfacilitiesltd-api.now.sh/users/api`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `${token}`,
		},
	});
	const user = await res.json();
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
