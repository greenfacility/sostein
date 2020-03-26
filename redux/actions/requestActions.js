// import cookie from 'react-cookies';
// import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import axios from 'axios';
import { Message } from 'antd';
import {
	ADD_REQUEST,
	// DELETE_REQUEST,
	GET_REQUEST,
	GET_REQUESTS,
	CHANGE_REQUEST_STATUS,
	REQUEST_ERR,
} from '../actionTypes';
import { getCookie } from './authActions';

export const getRequests = (user) => (dispatch) => {
	axios
		.get(`/api/request`)
		.then((response) => {
			if (response.data.status) {
				const final = response.data.result.map((data) => {
					var date = new Date(data.timestart);
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
						assigned: data.assigned,
						assignedId: data.assignedId,
						description: data.description,
						timestart: data.timestart,
						date: date.toDateString(),
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
			Message.error(response.data.msg);
			return dispatch({ type: REQUEST_ERR, payload: response.data.msg });
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			return dispatch({ type: REQUEST_ERR, payload: err.response.data.msg });
		});
};

export const getRequestLocal = async (user) => {
	// console.log(getGroup());
	try {
		const res = await axios.get(`/api/request`);

		const data = await res.data;

		if (data.msg) {
			// Message.error(data.msg);
			console.error(data.msg);
			return;
		}
		const final = data.result.map((data) => {
			var date = new Date(data.timestart);
			let dt = {
				_id: data._id,
				key: data._id,
				name: data.name,
				type: `${data.type.name}, ${data.type.type}`,
				from: `${data.from.firstname} ${data.from.lastname}`,
				by_id: data.from._id,
				status: data.status,
				timestart: data.timestart,
				date: date.toDateString(),
				assigned: data.assigned,
				assignedId: data.assignedId,
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
	} catch (error) {
		console.error(error.response);
	}
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
	axios
		.get(`/api/request/${id}`)
		.then((response) => {
			// console.log(response);
			if (response.data.success) {
				const data = response.data.result;
				var date = new Date(data.timestart);
				let dt = {
					_id: data._id,
					key: data._id,
					name: data.name,
					type: `${data.type.name}, ${data.type.type}`,
					from: `${data.from.firstname} ${data.from.lastname}`,
					by_id: data.from._id,
					status: data.status,
					picture: data.picture,
					assigned: data.assigned,
					assignedId: data.assignedId,
					rating: data.rating,
					description: data.description,
					date: date.toDateString(),
					timestart: data.timestart,
					timecompleted: data.timecompleted,
				};
				return dispatch({ type: GET_REQUEST, payload: dt });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			Message.error(response.data.msg);
			return dispatch({ type: REQUEST_ERR, payload: response.data.msg });
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			return dispatch({ type: REQUEST_ERR, payload: err.response.data.msg });
		});
};

export const deleteRequest = (id, user) => (dispatch) => {
	const token = getCookie('token');
	axios
		.delete(`/api/request/${id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Request is deleted successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while deleting the request');
		})
		.catch((err) => {
			Message.error('Unable to delete this request');
			return console.log(err.reponse);
		});
};

export const addRequest = (body, user) => (dispatch) => {
	body.from = user._id;
	// console.log(body);
	const token = getCookie('token');
	axios
		.post(`/api/request`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Request is added successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while adding request');
		})
		.catch((err) => {
			Message.error('Unable to add this request');
			return console.log(err.response);
		});
};

export const changeRequestStatus = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	const data = { status: body.status };
	axios
		.patch(`/api/request/${id}`, data, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Request status is changed successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while changing the request status');
		})
		.catch((err) => {
			Message.error('Unable to change this request status');
			return console.log(err.response);
		});
};

export const changeRating = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	const data = { rating: body };
	// console.log(data);
	if (user.usertype !== 'user') return;
	axios
		.patch(`/api/request/${id}`, data, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Request rating is changed successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while changing the request rating');
		})
		.catch((err) => {
			Message.error('Unable to change this request rating');
			return console.log(err.response);
		});
};

export const assignMember = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	const data = { assigned: body.name, assignedId: body.id };
	// console.log(data);
	if (user.usertype !== 'manager') return;
	axios
		.patch(`/api/request/${id}`, data, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Team Member is Assigned Successfully');
				return dispatch(getRequests(user));
			}
			Message.error('Error while assigning team member');
		})
		.catch((err) => {
			Message.error('Unable to assign team member');
			return console.log(err.response);
		});
};
