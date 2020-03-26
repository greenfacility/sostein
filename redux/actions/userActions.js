// actions/authActions.js
// import fetch from 'isomorphic-unfetch';
import cookie from 'react-cookies';
import Router from 'next/router';
import { Message } from 'antd';
import axios from 'axios';
import { btnLoading } from './uxActions';
import { USER_ERROR, EDITUSERINFO, USERSINFO } from '../actionTypes';

export const createUser = (user) => (dispatch) => {
	// console.log(user);
	dispatch(btnLoading());
	axios
		.put(`/api/user`, user, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			// console.log('ok set cookie', response.token);
			// console.log(response);
			if (!response.data.token) {
				Message.error(response.data.msg);
				dispatch(btnLoading());
				return dispatch({ type: USER_ERROR, payload: response.data.msg });
			}
			setCookie('token', response.data.token);
			Message.success('User Created Successfully!');
			dispatch(btnLoading());
			return dispatch(getUsers());
		})
		.catch((err) => {
			dispatch(btnLoading());
			console.log(err.response);
		});
};

export const editUser = (user, id) => (dispatch) => {
	dispatch(btnLoading());
	const token = getCookie('token');
	// console.log(user, id);
	axios
		.patch(`/api/users/${id}`, {
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
				dispatch(btnLoading());
				return dispatch(getUsers());
			}
			dispatch(btnLoading());
			Message.error(response.data.msg);
			return;
			// .then(() => Router.push('/dashboard'));
		})
		.catch((err) => {
			dispatch(btnLoading());
			console.log(err.response);
		});
};

export const getEditUser = (id) => (dispatch) => {
	// const token = getCookie('token');
	axios
		.get(`/api/users/${id}`)
		.then((response) => {
			if (response.data.success) {
				return dispatch({ type: EDITUSERINFO, payload: response.data.result });
			}
			Message.error(response.data.msg);
		})
		.catch((err) => {
			console.log(err.response);
			Message.error(err.response.data.msg);
		});
};

export const getUsers = () => (dispatch) => {
	const token = getCookie('token');
	// console.log(tokenz, token);
	if (!token) return null;
	axios
		.get(`/api/users`, {
			headers: {
				Authorization: token,
			},
		})
		.then((response) => {
			// console.log(response);
			if (response.data.success) {
				let final = response.data.result.filter((data) => {
					data.key = data._id;
					return data;
				});
				dispatch({ type: USERSINFO, payload: final });
				return { loaded: true };
			}
			// dispatch({ type: USERSINFO, payload: final });
			// console.log(response.msg);
		})
		.catch((err) => console.log(err.response));
};

export const getUsersLocal = async (token) => {
	// console.log(token);
	// const token = getCookie('token'object);
	try {
		if (!token) return null;
		const res = await axios.get(`/api/users`, {
			headers: {
				Accept: 'application/json',
				Authorization: `${token}`,
			},
		});
		const users = await res.data;
		// console.log(users);
		let final = users.result.filter((data) => {
			data.key = data._id;
			return data;
		});
		return final;
	} catch (error) {
		return console.log(error.response);
	}
};

export const deleteUser = (id) => (dispatch) => {
	dispatch(btnLoading());
	const token = getCookie('token');
	axios
		.delete(`/api/user/${id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
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
			return console.log(err.response);
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
