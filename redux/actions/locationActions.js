// import cookie from 'react-cookies';
// import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import { Message } from 'antd';
import {
	LOCATION_ERR,
	ADD_LOCATION,
	DELETE_LOCATION,
	EDIT_LOCATION,
	GET_LOCATIONS,
	GET_LOCATION,
} from '../actionTypes';
import { getCookie } from './authActions';

export const getLocations = () => (dispatch) => {
	axios
		.get(`/api/location`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				return dispatch({ type: LOCATION_ERR, payload: response.data.msg });
			}
			let final = response.data.result.filter((data) => {
				data.key = data._id;
				return data;
			});
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_LOCATIONS, payload: final });
		})
		.catch((err) => {
			Message.error(err.response.data.msg);
			return dispatch({ type: LOCATION_ERR, payload: err.response.data.msg });
		});
};

export const getLocationLocal = async () => {
	try {
		const res = await axios.get(`/api/location`);
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
		Message.error(error.response.data.msg);
		return;
	}
};

export const getLocation = (id) => (dispatch) => {
	axios
		.get(`/api/location/${id}`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				return dispatch({ type: LOCATION_ERR, payload: response.data.msg });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_LOCATION, payload: response.data.result });
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			return dispatch({ type: LOCATION_ERR, payload: err.response.data.msg });
		});
};

export const deleteLocation = (id) => (dispatch) => {
	const token = getCookie('token');
	// console.log(id);
	axios
		.delete(`/api/location/${id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.success) {
				Message.success('Location is deleted successfully');
				return dispatch(getLocations());
			}
			Message.error('Error while deleting the location');
		})
		.catch((err) => {
			Message.error('Unable to delete this location');
			return console.log(err.response.data);
		});
};

export const addLocation = (body) => (dispatch) => {
	const token = getCookie('token');
	// console.log(token, body);
	axios
		.post(`/api/location`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
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
			return console.log(err.response.data);
		});
};

export const editLocation = (body, id) => (dispatch) => {
	const token = getCookie('token');
	axios
		.patch(`/api/location/${id}`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Location status is changed successfully');
				dispatch({ type: EDIT_LOCATION, payload: {} });
				return dispatch(getLocations());
			}
			// console.log(result);
			Message.error('Error while updating the location');
		})
		.catch((err) => {
			Message.error('Unable to change this location status');
			return console.log(err.response.data);
		});
};
