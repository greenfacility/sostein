// import cookie from 'react-cookies';
// import Router from 'next/router';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import fetch from 'isomorphic-unfetch';
import { Message } from 'antd';
import {
	ADD_REQUEST,
	// DELETE_REQUEST,
	GET_REQUEST,
	GET_REQUESTS,
	CHANGE_REQUEST_STATUS,
	REQUEST_ERR,
	URL,
} from '../actionTypes';
import { getCookie } from './authActions';

export const getRequests = (user) => (dispatch) => {
	fetch(`${URL}/api/request`, {
		method: 'GET',
	})
		.then((data) => data.json())
		.then((response) => {
			if (response.status) {
				const final = response.result.map((data) => {
					let dt = {
						_id: data._id,
						key: data._id,
						name: data.name,
						type: `${data.type.name}, ${data.type.type}`,
						from: `${data.from.firstname} ${data.from.lastname}`,
						by_id: data.from._id,
						status: data.status,
						picture: data.picture,
						rating: data.rating,
						description: data.description,
						timestart: data.timestart,
						timecompleted: data.timecompleted,
					};
					// data.key = data._id;
					return dt;
				});
				let solution = final;
				if (user.usertype !== 'manager') {
					if (user.usertype !== 'admin') {
						solution = final.filter((dt) => dt.by_id === user._id);
					}
				}
				// console.log(solution);
				return dispatch({ type: GET_REQUESTS, payload: solution });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			Message.error(response.msg);
			return dispatch({ type: REQUEST_ERR, payload: response.msg });
		})
		.catch((err) => console.log(err));
};

export const getRequestLocal = async (user) => {
	// console.log(getGroup());
	const res = await fetch(`${URL}/api/request`, {
		method: 'GET',
	});

	const data = await res.json();

	if (data.msg) {
		// Message.error(data.msg);
		console.error(data.msg);
		return;
	}
	const final = data.result.map((data) => {
		let dt = {
			_id: data._id,
			key: data._id,
			name: data.name,
			type: `${data.type.name}, ${data.type.type}`,
			from: `${data.from.firstname} ${data.from.lastname}`,
			by_id: data.from._id,
			status: data.status,
			timestart: data.timestart,
			picture: data.picture,
			rating: data.rating,
			description: data.description,
			timecompleted: data.timecompleted,
		};
		// data.key = data._id;
		return dt;
	});
	let solution = final;
	if (user.usertype !== 'manager') {
		if (user.usertype !== 'admin') {
			solution = final.filter((dt) => dt.by_id === user._id);
		}
	}
	// console.log(user.usertype, 'admin');
	// console.log(solution);
	return solution;
};

export const getDayRequestNo = (datas, week, day) => {
	var tempProducts = [];
	datas.forEach((obj) => {
		var singleObj = { ...obj };
		tempProducts = [ ...tempProducts, singleObj ];
	});
	var datass = groupBy(tempProducts, (dt) => moment(dt.timestart).week());
	if (typeof datass[week] === 'undefined') {
		datass[week] = [];
	}
	datass[week].filter((dt) => {
		let dayname = '';
		let days = moment(dt.timestart).days();
		switch (days) {
			case 0:
				dayname = 'Sun';
				break;
			case 1:
				dayname = 'Mon';
				break;
			case 2:
				dayname = 'Tue';
				break;
			case 3:
				dayname = 'Wed';
				break;
			case 4:
				dayname = 'Thur';
				break;
			case 5:
				dayname = 'Fri';
				break;
			case 6:
				dayname = 'Sat';
				break;
			default:
				dayname = 'invalid';
				break;
		}
		dt.dayname = dayname;
		return dt;
	});

	const final = groupBy(datass[week], (dt) => dt.dayname === day);
	// console.log(groups);
	if (typeof final.true === 'undefined') {
		final.true = [];
	}
	// console.log(final.true.length);
	return final.true.length;
};

export const getRequest = (id) => (dispatch) => {
	fetch(`${URL}/api/request/${id}`, {
		method: 'GET',
	})
		.then((data) => data.json())
		.then((response) => {
			// console.log(response);
			if (response.success) {
				const data = response.result;
				let dt = {
					_id: data._id,
					key: data._id,
					name: data.name,
					type: `${data.type.name}, ${data.type.type}`,
					from: `${data.from.firstname} ${data.from.lastname}`,
					by_id: data.from._id,
					status: data.status,
					picture: data.picture,
					rating: data.rating,
					description: data.description,
					timestart: data.timestart,
					timecompleted: data.timecompleted,
				};
				return dispatch({ type: GET_REQUEST, payload: dt });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			Message.error(response.msg);
			return dispatch({ type: REQUEST_ERR, payload: response.msg });
		})
		.catch((err) => console.log(err));
};

export const deleteRequest = (id, user) => (dispatch) => {
	const token = getCookie('token');
	fetch(`${URL}/api/request/${id}`, {
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
				Message.success('Request is deleted successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while deleting the request');
		})
		.catch((err) => {
			Message.error('Unable to delete this request');
			return console.log(err);
		});
};

export const addRequest = (body, user) => (dispatch) => {
	body.from = user._id;
	// console.log(body);
	const token = getCookie('token');
	fetch(`${URL}/api/request`, {
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
				Message.success('Request is added successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while adding request');
		})
		.catch((err) => {
			Message.error('Unable to add this request');
			return console.log(err);
		});
};

export const changeRequestStatus = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	const data = { status: body.status };
	fetch(`${URL}/api/request/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(data),
	})
		.then((data) => data.json())
		.then((result) => {
			if (result.success) {
				Message.success('Request status is changed successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while changing the request status');
		})
		.catch((err) => {
			Message.error('Unable to change this request status');
			return console.log(err);
		});
};

export const changeRating = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	const data = { rating: body };
	// console.log(data);
	if (user.usertype !== 'user') return;
	fetch(`${URL}/api/request/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(data),
	})
		.then((data) => data.json())
		.then((result) => {
			if (result.success) {
				Message.success('Request rating is changed successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while changing the request rating');
		})
		.catch((err) => {
			Message.error('Unable to change this request rating');
			return console.log(err);
		});
};
