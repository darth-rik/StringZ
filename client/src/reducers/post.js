import {
	ADD_COMMENT,
	ADD_POST,
	DELETE_POST,
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	REMOVE_COMMENT,
	UPDATE_LIKES,
} from "../actions/types";

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};

		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			};

		case ADD_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
				loading: false,
			};

		case ADD_COMMENT:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId
						? { ...post, comments: payload.comments }
						: post
				),
				post: state.post && {
					...state.post,
					comments: payload.comments,
				},
				loading: false,
			};

		case REMOVE_COMMENT:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId
						? {
								...post,
								comments: post.comments.filter(
									(comment) => comment._id !== payload.commentId
								),
						  }
						: post
				),
				post: state.post && {
					...state.post,
					comments: state.post.comments.filter(
						(comment) => comment._id !== payload.commentId
					),
				},
				loading: false,
			};

		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...post, likes: payload.likes } : post
				),
				loading: false,
				post:
					state.post && state.post._id === payload.postId
						? { ...state.post, likes: payload.likes }
						: state.post,
			};

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
				loading: false,
				post: null,
			};

		default:
			return state;
	}
}
