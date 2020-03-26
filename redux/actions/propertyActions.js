// import cookie from 'react-cookies';
// import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
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

export const getProperties = () => (dispatch) => {
	axios
		.get(`/api/property`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				return dispatch({ type: PROPERTY_ERR, payload: response.data.msg });
			}
			let final = response.data.result.filter((data) => {
				data.key = data._id;
				return data;
			});
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_PROPERTYS, payload: final });
		})
		.catch((err) => {
			console.log(err);
			Message.error(response.data.msg);
			return dispatch({ type: PROPERTY_ERR, payload: response.data.msg });
		});
};

export const getPropertyLocal = async () => {
	try {
		const res = await axios.get(`/api/property`);
		const data = await res.data;
		// console.log(data);

		if (data.msg) {
			Message.error(data.msg);
			return;
		}
		let final = data.result.filter((data) => {
			data.key = data._id;
			return data;
		});
		return final;
	} catch (error) {
		console.log(error);
		Message.error(error.response.data.msg);
		return;
	}
};

export const getProperty = (id) => (dispatch) => {
	axios
		.get(`/api/property/${id}`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				return dispatch({ type: PROPERTY_ERR, payload: response.data.msg });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_PROPERTY, payload: response.data.result });
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			return dispatch({ type: PROPERTY_ERR, payload: err.response.data.msg });
		});
};

export const deleteProperty = (id) => (dispatch) => {
	const token = getCookie('token');
	// console.log(id);
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
				return dispatch(getProperties());
			}
			Message.error('Error while deleting the property');
		})
		.catch((err) => {
			Message.error('Unable to delete this property');
			return console.log(err.response.data);
		});
};

export const addProperty = (body) => (dispatch) => {
	const token = getCookie('token');
	// console.log(token, body);
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
				return dispatch(getProperties());
			}
			// console.log(result);
			Message.error('Error while adding property');
		})
		.catch((err) => {
			// console.log(err);
			Message.error('Unable to add this property');
			return console.log(err.response);
		});
};

export const editProperty = (body, id) => (dispatch) => {
	const token = getCookie('token');
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
				return dispatch(getProperties());
			}
			// console.log(result);
			Message.error('Error while updating the property');
		})
		.catch((err) => {
			Message.error('Unable to change this property status');
			return console.log(err.response);
		});
};
