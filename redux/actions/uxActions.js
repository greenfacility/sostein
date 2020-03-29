import {
	BTNLOADING,
	LOCATIONOC,
	PROPERTYOC,
	REQUESTOC,
	SERVICEOC,
	USEROC,
	LOCATIONOC2,
	PROPERTYOC2,
	REQUESTOC2,
	REQUESTOC3,
	SERVICEOC2,
	USEROC2,
} from '../actionTypes';

export const inProgress = () => (dispatch) => dispatch({ type: BTNLOADING, payload: true });

export const notInProgress = () => (dispatch) => dispatch({ type: BTNLOADING, payload: false });

export const locationOpenAndClose = () => (dispatch) => dispatch({ type: LOCATIONOC });
export const locationOpenAndClose2 = () => (dispatch) => dispatch({ type: LOCATIONOC2 });
export const propertyOpenAndClose = () => (dispatch) => dispatch({ type: PROPERTYOC });
export const propertyOpenAndClose2 = () => (dispatch) => dispatch({ type: PROPERTYOC2 });
export const requestOpenAndClose = () => (dispatch) => dispatch({ type: REQUESTOC });
export const requestOpenAndClose2 = () => (dispatch) => dispatch({ type: REQUESTOC2 });
export const requestOpenAndClose3 = () => (dispatch) => dispatch({ type: REQUESTOC3 });
export const serviceOpenAndClose = () => (dispatch) => dispatch({ type: SERVICEOC });
export const serviceOpenAndClose2 = () => (dispatch) => dispatch({ type: SERVICEOC2 });
export const userOpenAndClose = () => (dispatch) => dispatch({ type: USEROC });
export const userOpenAndClose2 = () => (dispatch) => dispatch({ type: USEROC2 });
