// redux/actionTypes.js

// AUTHENTICATION APIS ACTIONS
export const API = 'API';
export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_ERROR = 'USER_ERROR';
export const DEAUTHENTICATE = 'DEAUTHENTICATE';
export const TITLE = 'TITLE';
export const REGISTER = 'REGISTER';
export const USERINFO = 'USERINFO';
export const USERSINFO = 'USERSINFO';
export const NIGHTMODE = 'NIGHTMODE';
export const EDITUSERINFO = 'EDITUSERINFO';

// API URL
// export const URL = 'https://newgreentemplate.now.sh';
export const URL = 'http://localhost:3000';

// REQUEST APIS ACTIONS
export const GET_REQUESTS = 'GET_REQUESTS';
export const CHANGE_REQUEST_STATUS = 'CHANGE_REQUEST_STATUS';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const GET_REQUEST = 'GET_REQUEST';
export const ADD_REQUEST = 'ADD_REQUEST';
export const REQUEST_ERR = 'REQUEST_ERR';

// SERVICE APIS ACTIONS
export const GET_SERVICE = 'GET_SERVICE';
export const GET_SERVICES = 'GET_SERVICES';
export const ADD_SERVICE = 'ADD_SERVICE';
export const EDIT_SERVICE = 'EDIT_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const SERVICE_ERR = 'SERVICE_ERR';

// LOCATION APIS ACTIONS
export const GET_LOCATION = 'GET_LOCATION';
export const GET_LOCATIONS = 'GET_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';
export const EDIT_LOCATION = 'EDIT_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const LOCATION_ERR = 'LOCATION_ERR';

// UX ACTIONS
export const REQUESTING = 'REQUESTING';
