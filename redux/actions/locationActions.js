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
import { locationOpenAndClose, locationOpenAndClose2, inProgress, notInProgress } from '../actions';

export const getLocations = () => (dispatch) => {
	dispatch(inProgress());
	axios
		.get(`/api/location`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				dispatch(notInProgress());
				return dispatch({ type: LOCATION_ERR, payload: response.data.msg });
			}
			let final = response.data.result.filter((data) => {
				data.key = data._id;
				return data;
			});
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch({ type: GET_LOCATIONS, payload: final });
			dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error(err.response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: LOCATION_ERR, payload: err.response.data.msg });
		});
};

export const getLocationLocal = async (host) => {
	try {
		const res = await fetch(`${host}/api/location`);
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
	} catch (error) {
		Message.error(error.msg);
		return;
	}
};

export const getLocation = (id) => (dispatch) => {
	dispatch(inProgress());
	axios
		.get(`/api/location/${id}`)
		.then((response) => {
			if (response.data.msg) {
				Message.error(response.data.msg);
				dispatch(notInProgress());
				return dispatch({ type: LOCATION_ERR, payload: response.data.msg });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			dispatch(notInProgress());
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
	dispatch(inProgress());
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
				dispatch(notInProgress());
				return dispatch(getLocations());
			}
			Message.error('Error while deleting the location');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to delete this location');
			dispatch(notInProgress());
			return console.log(err.response.data);
		});
};

export const addLocation = (body) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
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
				dispatch(locationOpenAndClose());
				dispatch(notInProgress());
				return dispatch(getLocations());
			}
			// console.log(result);
			Message.error('Error while adding location');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			// console.log(err);
			Message.error('Unable to add this location');
			dispatch(notInProgress());
			return console.log(err.response.data);
		});
};

export const editLocation = (body, id) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
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
				dispatch(locationOpenAndClose2());
				dispatch(notInProgress());
				return dispatch(getLocations());
			}
			// console.log(result);
			Message.error('Error while updating the location');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to change this location status');
			dispatch(notInProgress());
			return console.log(err.response.data);
		});
};
