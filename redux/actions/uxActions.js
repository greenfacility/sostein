import { REQUESTING } from '../actionTypes';

export const btnLoading = () => (dispatch) => dispatch({ type: REQUESTING });
