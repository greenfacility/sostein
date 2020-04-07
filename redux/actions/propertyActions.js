// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import {
	PROPERTY_ERR,
	ADD_PROPERTY,
	DELETE_PROPERTY,
	EDIT_PROPERTY,
	GET_PROPERTYS,
	GET_PROPERTY,
} from '../actionTypes';
import { getCookie } from './authActions';
import { inProgress, notInProgress, propertyOpenAndClose, propertyOpenAndClose2 } from './uxActions';

export const getProperties = (user) => (dispatch) => {
	dispatch(inProgress());
	axios
		.get(`/api/property`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				dispatch(notInProgress());

				return dispatch({ type: PROPERTY_ERR, payload: response.data.msg });
			}
			let final = response.data.result.filter((data) => {
				data.key = data._id;
				return data;
			});
			let solution = [];

			if (user.usertype === 'manager' || user.usertype === 'team-member') {
				solution = final;
			} else {
				solution = final.filter((dt) => dt.ownId === user._id);
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch(notInProgress());

			dispatch({ type: GET_PROPERTYS, payload: solution });
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			dispatch(notInProgress());

			return dispatch({ type: PROPERTY_ERR, payload: response.data.msg });
		});
};

export const getPropertyLocal = async (host, user) => {
	try {
		const res = await fetch(`${host}/api/property`);
		const data = await res.json();
		// console.log(data);

		if (data.msg) {
			Message.error(data.msg);
			return;
		}
		let final = data.result.filter((data) => {
			data.key = data._id;
			return data;
		});
		let solution = [];
		if (user.usertype === 'manager' || user.usertype === 'team-member') {
			solution = final;
		} else {
			solution = final.filter((dt) => dt.ownId === user._id);
		}
		return solution;
	} catch (error) {
		console.log(error);
		Message.error(error);
		return;
	}
};

export const getProperty = (id) => (dispatch) => {
	dispatch(inProgress());
	axios
		.get(`/api/property/${id}`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				dispatch(notInProgress());
				return dispatch({ type: PROPERTY_ERR, payload: response.data.msg });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_PROPERTY, payload: response.data.result });
			dispatch(notInProgress());
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: PROPERTY_ERR, payload: err.response.data.msg });
		});
};

export const deleteProperty = (id, user) => (dispatch) => {
	const token = getCookie('token');
	// console.log(id);
	dispatch(inProgress());
	axios
		.delete(`/api/property/${id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Property is deleted successfully');
				dispatch(notInProgress());
				return dispatch(getProperties(user));
			}
			dispatch(notInProgress());
			Message.error('Error while deleting the property');
		})
		.catch((err) => {
			Message.error('Unable to delete this property');
			dispatch(notInProgress());
			return console.log(err.response.data);
		});
};

export const addProperty = (body, user) => (dispatch) => {
	const token = getCookie('token');
	// console.log(token, body);
	dispatch(notInProgress());
	axios
		.post(`/api/property`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Property is added successfully');
				// dispatch({ type: ADD_PROPERTY, payload: result.data });
				dispatch(notInProgress());
				dispatch(propertyOpenAndClose());
				return dispatch(getProperties(user));
			}
			// console.log(result);
			Message.error('Error while adding property');
			dispatch(notInProgress());
		})
		.catch((err) => {
			// console.log(err);
			Message.error('Unable to add this property');
			dispatch(notInProgress());
			return console.log(err.response);
		});
};

export const editProperty = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	axios
		.patch(`/api/property/${id}`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Property status is changed successfully');
				dispatch({ type: EDIT_PROPERTY, payload: {} });
				dispatch(notInProgress());
				dispatch(propertyOpenAndClose2());
				return dispatch(getProperties(user));
			}
			// console.log(result);
			Message.error('Error while updating the property');
			dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to change this property status');
			dispatch(notInProgress());
			return console.log(err.response);
		});
};
