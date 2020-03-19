// actions/authActions.js
import cookie from 'react-cookies';
import Router from 'next/router';
import { Message } from 'antd';
import fetch from 'isomorphic-unfetch';
import { btnLoading } from './uxActions';
import { USER_ERROR, URL, EDITUSERINFO, USERSINFO } from '../actionTypes';

export const createUser = (user) => (dispatch) => {
	// console.log(user);
	dispatch(btnLoading());
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
				dispatch(btnLoading());
				return dispatch({ type: USER_ERROR, payload: response.msg });
			}
			setCookie('token', response.token);
			Message.success('User Created Successfully!');
			dispatch(btnLoading());
			return dispatch(getUsers());
		})
		.catch((err) => {
			dispatch(btnLoading());
			console.log(err);
		});
};

export const editUser = (user, id) => (dispatch) => {
	dispatch(btnLoading());
	const token = getCookie('token');
	// console.log(user, id);
	fetch(`${URL}/api/users/${id}`, {
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
				dispatch(btnLoading());
				return dispatch(getUsers());
			}
			dispatch(btnLoading());
			Message.error(response.msg);
			return;
			// .then(() => Router.push('/dashboard'));
		})
		.catch((err) => {
			dispatch(btnLoading());
			console.log(err);
		});
};

export const getEditUser = (id) => (dispatch) => {
	// const token = getCookie('token');
	fetch(`${URL}/api/users/${id}`, {
		method: 'GET',
	})
		.then((data) => data.json())
		.then((response) => {
			if (response.success) {
				return dispatch({ type: EDITUSERINFO, payload: response.result });
			}
			Message.error(response.msg);
		})
		.catch((err) => console.log(err));
};

export const getUsers = () => (dispatch) => {
	const token = getCookie('token');
	// console.log(tokenz, token);
	if (!token) return null;
	fetch(`${URL}/api/users`, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	})
		.then((res) => res.json())
		.then((response) => {
			// console.log(response);
			if (response.success) {
				let final = response.result.filter((data) => {
					data.key = data._id;
					return data;
				});
				dispatch({ type: USERSINFO, payload: final });
				return { loaded: true };
			}
			// dispatch({ type: USERSINFO, payload: final });
			// console.log(response.msg);
		})
		.catch((err) => console.log(err));
};

export const getUsersLocal = async (token) => {
	// console.log(token);
	// const token = getCookie('token'object);
	if (!token) return null;
	const res = await fetch(`${URL}/api/users`, {
		// const res = await fetch(`https://greenfacilitiesltd-api.now.sh/users/api`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `${token}`,
		},
	});
	const users = await res.json();
	// console.log(users);
	let final = users.result.filter((data) => {
		data.key = data._id;
		return data;
	});
	return final;
};

export const deleteUser = (id) => (dispatch) => {
	dispatch(btnLoading());
	const token = getCookie('token');
	fetch(`${URL}/api/user/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify({}),
	})
		.then((data) => data.json())
		.then((result) => {
			if (result.success) {
				Message.success('User is deleted successfully');
				dispatch(btnLoading());
				return dispatch(getUsers());
			}
			dispatch(btnLoading());
			Message.error('Error while deleting the user');
		})
		.catch((err) => {
			dispatch(btnLoading());
			Message.error('Unable to delete this user');
			return console.log(err);
		});
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
