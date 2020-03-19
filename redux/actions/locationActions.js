// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { Message } from 'antd';
import {
	LOCATION_ERR,
	ADD_LOCATION,
	DELETE_LOCATION,
	EDIT_LOCATION,
	GET_LOCATIONS,
	URL,
	GET_LOCATION,
} from '../actionTypes';
import { getCookie } from './authActions';

export const getLocations = () => (dispatch) => {
	fetch(`${URL}/api/location`, {
		method: 'GET',
	})
		.then((data) => data.json())
		.then((response) => {
			if (response.msg) {
				Message.error(response.msg);
				return dispatch({ type: LOCATION_ERR, payload: response.msg });
			}
			let final = response.result.filter((data) => {
				data.key = data._id;
				return data;
			});
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_LOCATIONS, payload: final });
		})
		.catch((err) => console.log(err));
};

export const getLocationLocal = async () => {
	const res = await fetch(`${URL}/api/location`, {
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

export const getLocation = (id) => (dispatch) => {
	fetch(`${URL}/api/location/${id}`, {
		method: 'GET',
	})
		.then((data) => data.json())
		.then((response) => {
			if (response.msg) {
				Message.error(response.msg);
				return dispatch({ type: LOCATION_ERR, payload: response.msg });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_LOCATION, payload: response.result });
		})
		.catch((err) => console.log(err));
};

export const deleteLocation = (id) => (dispatch) => {
	const token = getCookie('token');
	// console.log(id);
	fetch(`${URL}/api/location/${id}`, {
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
				Message.success('Location is deleted successfully');
				return dispatch(getLocations());
			}
			Message.error('Error while deleting the location');
		})
		.catch((err) => {
			Message.error('Unable to delete this location');
			return console.log(err);
		});
};

export const addLocation = (body) => (dispatch) => {
	const token = getCookie('token');
	// console.log(token, body);
	fetch(`${URL}/api/location`, {
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
				Message.success('Location is added successfully');
				// dispatch({ type: ADD_LOCATION, payload: result.data });
				return dispatch(getLocations());
			}
			// console.log(result);
			Message.error('Error while adding location');
		})
		.catch((err) => {
			// console.log(err);
			Message.error('Unable to add this location');
			return console.log(err);
		});
};

export const editLocation = (body, id) => (dispatch) => {
	const token = getCookie('token');
	fetch(`${URL}/api/location/${id}`, {
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
				Message.success('Location status is changed successfully');
				dispatch({ type: EDIT_LOCATION, payload: {} });
				return dispatch(getLocations());
			}
			// console.log(result);
			Message.error('Error while updating the location');
		})
		.catch((err) => {
			Message.error('Unable to change this location status');
			return console.log(err);
		});
};
