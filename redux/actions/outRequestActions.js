import axios from 'axios';
import { Message } from 'antd';
import { GET_OUTREQUEST, GET_OUTREQUESTS, OUTREQUEST_ERR } from '../actionTypes';
import { getCookie } from './authActions';
import {
	inProgress,
	notInProgress,
	requestOpenAndClose22,
	requestOpenAndClose33,
	requestOpenAndClose44,
} from './uxActions';

export const getOutRequests = (user) => (dispatch) => {
	dispatch(inProgress());
	axios
		.get(`/api/request/out`)
		.then((response) => {
			if (response.data.status) {
				const final = response.data.result.map((data) => {
					var schedule = new Date(data.timescheduled);
					var date = new Date(data.timestart);
					var dt = data;
					dt.date = date;
					dt.schedule = schedule;
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
				return dispatch({ type: GET_OUTREQUESTS, payload: solutions });
			}
			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			Message.error(response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: OUTREQUEST_ERR, payload: response.data.msg });
		})
		.catch((err) => {
			console.log(err);
			Message.error(err.response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: OUTREQUEST_ERR, payload: err.response.data.msg });
		});
};

export const getOutRequestLocal = async (host, user) => {
	// console.log(getGroup());
	try {
		const res = await fetch(`${host}/api/request/out`);

		const data = await res.json();

		if (data.msg) {
			// Message.error(data.msg);
			console.error(data.msg);
			return;
		}
		const final = data.result.map((data) => {
			var date = new Date(data.timestart);
			var schedule = new Date(data.timescheduled);
			var dt = data;
			dt.date = date;
			dt.schedule = schedule;
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

export const getOutRequest = (id) => (dispatch) => {
	dispatch(inProgress());
	axios
		.get(`/api/request/out/${id}`)
		.then((response) => {
			// console.log(response);
			if (response.data.success) {
				const data = response.data.result;
				var date = new Date(data.timestart);
				var schedule = new Date(data.timescheduled);
				var dt = data;
				dt.date = date;
				dt.schedule = schedule;
				dispatch(notInProgress());
				return dispatch({ type: GET_OUTREQUEST, payload: dt });
			}

			// Message.success('Sign complete. Taking you to your dashboard!').then(() => Router.push('/dashboard'));
			Message.error(response.data.msg);
			dispatch(notInProgress());
			return dispatch({ type: OUTREQUEST_ERR, payload: response.data.msg });
		})
		.catch((err) => {
			console.log(err);
			Message.error('Unable to get request');
			dispatch(notInProgress());
			return dispatch({ type: OUTREQUEST_ERR, payload: err.response.data.msg });
		});
};

export const deleteOutRequest = (id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	axios
		.delete(`/api/request/out/${id}`, {
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
				return dispatch(getOutRequests(user));
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

export const addOutRequest = (body, user) => (dispatch) => {
	// body.from = user._id;
	// console.log(body);
	const token = getCookie('token');
	dispatch(inProgress());
	axios
		.put(`/api/request`, body, {
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
				alert('Request is added successfully');
				return dispatch(getOutRequests(user));
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

export const changeOutRequestStatus = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	let data = {};
	if (body.status === 'done') {
		data = { status: body.status, timecompleted: Date.now() };
	} else {
		data = { status: body.status };
	}
	axios
		.patch(`/api/request/out/${id}`, data, {
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
				dispatch(requestOpenAndClose33());
				return dispatch(getOutRequests(user));
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

export const assignOutMember = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	const data = { assigned: body.name, assignedId: body.id, email: body.email };
	// console.log(data);
	if (user.usertype !== 'manager') return dispatch(notInProgress());
	axios
		.patch(`/api/request/out/${id}`, data, {
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
				dispatch(requestOpenAndClose22());
				return dispatch(getOutRequests(user));
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

export const scheduleOutTime = (body, id, user) => (dispatch) => {
	const token = getCookie('token');
	dispatch(inProgress());
	const data = { email: user.email, timescheduled: body.timescheduled };
	// console.log(data);
	if (user.usertype === 'manager' || user.usertype === 'user') return dispatch(notInProgress());
	axios
		.put(`/api/request/out/${id}`, data, {
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
				dispatch(requestOpenAndClose44());
				return dispatch(getOutRequests(user));
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
