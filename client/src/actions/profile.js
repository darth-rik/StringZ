import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	SEARCH_PROFILE,
	USER_PROFILE,
} from "./types";

//Get current profile

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Create profile

export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	dispatch({
		type: CLEAR_PROFILE,
	});
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/api/profile", formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Create Profile Picture
export const createAvatar = (formData) => async (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	});
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		await axios.post("/api/profile/pic", formData, config);
		dispatch(getCurrentProfile());
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

// Get User profile by id

export const getProfileById = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${id}`);

		dispatch({
			type: USER_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Search User Profile

export const searchProfile = (query) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/search?query=${query}`);

		dispatch({
			type: SEARCH_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};
//Mark Notification as Read

export const readNotification = (id) => async (dispatch) => {
	try {
		await axios.put(`/api/profile/notification/${id}`);

		dispatch(getCurrentProfile());
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};
