import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	SEARCH_PROFILE,
	USER_PROFILE,
} from "../actions/types";

const initialState = {
	profile: null,
	loading: true,
	error: {},
	profiles: [],
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,

				profile: payload,
				loading: false,
			};
		case USER_PROFILE:
			return {
				...state,

				user: payload,
				loading: false,
			};
		case SEARCH_PROFILE:
			return {
				...state,
				profiles: payload,
				loading: false,
			};

		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null,
			};

		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: true,
				error: null,
				profiles: [],
			};

		default:
			return state;
	}
}
