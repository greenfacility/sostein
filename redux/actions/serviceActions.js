// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { Message } from 'antd';
import { SERVICE_ERR, ADD_SERVICE, DELETE_SERVICE, EDIT_SERVICE, GET_SERVICES, URL, GET_SERVICE } from '../actionTypes';
import { getCookie } from './authActions';

export const getServices = () => (dispatch) => {
	fetch(`${URL}/api/service`, {
		method: 'GET',
	})
		.then((data) => data.json())
		.then((response) => {
			if (response.msg) {
				Message.error(response.msg);
				return dispatch({ type: SERVICE_ERR, payload: response.msg });
			}
			let final = response.result.filter((data) => {
				data.key = data._id;
				return data;
			});
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_SERVICES, payload: final });
		})
		.catch((err) => console.log(err));
};

export const getServicesLocal = async () => {
	const res = await fetch(`${URL}/api/service`, {
		method: 'GET',
	});
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
	return final;
};

export const getService = (id) => (dispatch) => {
	fetch(`${URL}/api/service/${id}`, {
		method: 'GET',
	})
		.then((data) => data.json())
		.then((response) => {
			if (response.msg) {
				Message.error(response.msg);
				return dispatch({ type: SERVICE_ERR, payload: response.msg });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_SERVICE, payload: response.result });
		})
		.catch((err) => console.log(err));
};

export const deleteService = (id) => (dispatch) => {
	const token = getCookie('token');
	// console.log(id);
	fetch(`${URL}/api/service/${id}`, {
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
				Message.success('Service is deleted successfully');
				return dispatch(getServices());
			}
			Message.error('Error while deleting the service');
		})
		.catch((err) => {
			Message.error('Unable to delete this service');
			return console.log(err);
		});
};

export const addService = (body) => (dispatch) => {
	const token = getCookie('token');
	// console.log(token, body);
	fetch(`${URL}/api/service`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(body),
	})
		.then((data) => data.json())
		.then((result) => {
			if (result.success) {
				Message.success('Service is added successfully');
				// dispatch({ type: ADD_SERVICE, payload: result.data });
				return dispatch(getServices());
			}
			// console.log(result);
			Message.error('Error while adding service');
		})
		.catch((err) => {
			// console.log(err);
			Message.error('Unable to add this service');
			return console.log(err);
		});
};

export const editService = (body, id) => (dispatch) => {
	const token = getCookie('token');
	fetch(`${URL}/api/service/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(body),
	})
		.then((data) => data.json())
		.then((result) => {
			if (result.success) {
				Message.success('Service status is changed successfully');
				dispatch({ type: EDIT_SERVICE, payload: {} });
				return dispatch(getServices());
			}
			// console.log(result);
			Message.error('Error while updating the service');
		})
		.catch((err) => {
			Message.error('Unable to change this service status');
			return console.log(err);
		});
};
