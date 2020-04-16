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
import {
	inProgress,
	notInProgress,
	requestOpenAndClose,
	requestOpenAndClose2,
	requestOpenAndClose3,
	requestOpenAndClose4,
} from './uxActions';

export const getRequests = (user) => (dispatch) => {
	dispatch(inProgress());
	axios
		.get(`/api/request`)
		.then((response) => {
			if (response.data.status) {
				const final = response.data.result.map((data) => {
					var schedule = new Date(data.timescheduled);
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
						property: data.property,
						propertyId: data.propertyId,
						date: date.toDateString(),
						timecompleted: data.timecompleted,
						timescheduled: schedule.toDateString(),
					};
					// data.key = data._id;
					return dt;
				});
				let solution = final.filter((data) => {
					var lifetime;
					var lifedays;
					var lifehour;
					var final;
					var start = new Date(data.timestart);
					if (data.status == 'done') {
						var finish = new Date(data.timecompleted);
						lifehour = finish.getHours() - start.getHours();
						lifetime = finish.getTime() - start.getTime();
						lifedays = lifetime / (1000 * 3600 * 24);
						lifedays = parseInt(lifedays);
						final = `${lifehour} hours ${lifedays} days`;
					} else {
						var finish = new Date();
						lifehour = finish.getHours() - start.getHours();
						lifetime = finish.getTime() - start.getTime();
						lifedays = lifetime / (1000 * 3600 * 24);
						lifedays = parseInt(lifedays);
						final = `${lifehour} hours ${lifedays} days - Still pending`;
					}
					data.lifetime = final;
					return data;
				});
				let solutions = solution;
				if (user.usertype === 'manager') {
					solutions = solution;
				} else if (user.usertype === 'team-member') {
					solutions = solution.filter((dt) => dt.assignedId === user._id);
					// console.log(user.usertype, 'admin');
					// console.log(solution);
				} else {
					solutions = solution.filter((dt) => dt.by_id === user._id);
				}
				// console.log(solution);
				dispatch(notInProgress());
				return dispatch({ type: GET_REQUESTS, payload: solutions });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			Message.error(response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: REQUEST_ERR, payload: response.data.msg });
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: REQUEST_ERR, payload: err.response.data.msg });
		});
};

export const getRequestLocal = async (host, user) => {
	// console.log(getGroup());
	try {
		const res = await fetch(`${host}/api/request`);

		const data = await res.json();

		if (data.msg) {
			// Message.error(data.msg);
			console.error(data.msg);
			return;
		}
		const final = data.result.map((data) => {
			var date = new Date(data.timestart);
			var schedule = new Date(data.timescheduled);
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
				property: data.property,
				propertyId: data.propertyId,
				rating: data.rating,
				description: data.description,
				timecompleted: data.timecompleted,
				timescheduled: schedule.toDateString(),
			};
			// data.key = data._id;
			return dt;
		});
		let solution = final.filter((data) => {
			var lifetime;
			var lifedays;
			var lifehour;
			var final;
			var start = new Date(data.timestart);
			if (data.status == 'done') {
				var finish = new Date(data.timecompleted);
				lifehour = finish.getHours() - start.getHours();
				lifetime = finish.getTime() - start.getTime();
				lifedays = lifetime / (1000 * 3600 * 24);
				lifedays = parseInt(lifedays);
				final = `${lifehour} hours ${lifedays} days`;
			} else {
				var finish = new Date();
				lifehour = finish.getHours() - start.getHours();
				lifetime = finish.getTime() - start.getTime();
				lifedays = lifetime / (1000 * 3600 * 24);
				lifedays = parseInt(lifedays);
				final = `${lifehour} hours ${lifedays} days - Still pending`;
			}
			data.lifetime = final;
			return data;
		});
		let solutions = solution;
		if (user.usertype === 'manager') {
			solutions = solution;
		} else if (user.usertype === 'team-member') {
			solutions = solution.filter((dt) => dt.assignedId === user._id);
			// console.log(user.usertype, 'admin');
			// console.log(solution);
		} else {
			solutions = solution.filter((dt) => dt.by_id === user._id);
		}
		return solutions;
	} catch (error) {
		console.error(error);
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
	dispatch(inProgress());
	axios
		.get(`/api/request/${id}`)
		.then((response) => {
			// console.log(response);
			if (response.data.success) {
				const data = response.data.result;
				var date = new Date(data.timestart);
				var schedule = new Date(data.timescheduled);
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
					property: data.property,
					propertyId: data.propertyId,
					description: data.description,
					date: date.toDateString(),
					timestart: data.timestart,
					timecompleted: data.timecompleted,
					timescheduled: schedule.toDateString(),
				};
				dispatch(notInProgress());
				return dispatch({ type: GET_REQUEST, payload: dt });
			}

			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			Message.error(response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: REQUEST_ERR, payload: response.data.msg });
		})
		.catch((err) => {
			console.log(err);
			Message.error('Unable to get request');
			dispatch(notInProgress());
			return dispatch({ type: REQUEST_ERR, payload: err.response.data.msg });
		});
};

export const deleteRequest = (id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
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
				dispatch(notInProgress());
				return dispatch(getRequests(user));
			}
			Message.error('Error while deleting the request');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to delete this request');
			dispatch(notInProgress());
			return console.log(err.reponse);
		});
};

export const addRequest = (body, user) => (dispatch) => {
	// body.from = user._id;
	// console.log(body);
	const token = getCookie('token');
	dispatch(inProgress());
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
				dispatch(notInProgress());
				dispatch(requestOpenAndClose());
				return dispatch(getRequests(user));
			}
			Message.error('Error while adding request');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to add this request');
			dispatch(notInProgress());
			return console.log(err.response);
		});
};

export const changeRequestStatus = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	let data = {};
	if (body.status === 'done') {
		data = { status: body.status, timecompleted: Date.now() };
	} else {
		data = { status: body.status };
	}
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
				dispatch(notInProgress());
				dispatch(requestOpenAndClose3());
				return dispatch(getRequests(user));
			}
			Message.error('Error while changing the request status');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to change this request status');
			dispatch(notInProgress());
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
			return Message.error('Error while changing the request rating');
		})
		.catch((err) => {
			Message.error('Unable to change this request rating');
			return console.log(err.response);
		});
};

export const assignMember = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	const data = { assigned: body.name, assignedId: body.id, email: body.email };
	// console.log(data);
	if (user.usertype !== 'manager') return dispatch(notInProgress());
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
				dispatch(notInProgress());
				dispatch(requestOpenAndClose2());
				return dispatch(getRequests(user));
			}
			Message.error('Error while assigning team member');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to assign team member');
			dispatch(notInProgress());
			return console.log(err.response);
		});
};

export const scheduleTime = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	const data = { email: user.email, timescheduled: body.timescheduled };
	// console.log(data);
	if (user.usertype === 'manager' || user.usertype === 'user') return dispatch(notInProgress());
	axios
		.put(`/api/request/${id}`, data, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		})
		.then((result) => {
			if (result.data.success) {
				Message.success('Time was scheduled successfully');
				dispatch(notInProgress());
				dispatch(requestOpenAndClose4());
				return dispatch(getRequests(user));
			}
			Message.error('Error while schedulling time');
			return dispatch(notInProgress());
		})
		.catch((err) => {
			Message.error('Unable to schedule time');
			dispatch(notInProgress());
			return console.log(err.response);
		});
};
