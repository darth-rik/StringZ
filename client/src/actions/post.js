import axios from "axios";

import { setAlert } from "./alert";
import { getCurrentProfile } from "./profile";

import {
	ADD_COMMENT,
	ADD_POST,
	DELETE_POST,
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	REMOVE_COMMENT,
	UPDATE_LIKES,
} from "./types";

//Get Posts

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/posts");

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Add like

export const addLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Remove Like

export const removeLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Delete Post

export const deletePost = (postId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/${postId}`);

		dispatch({
			type: DELETE_POST,
			payload: postId,
		});

		dispatch(setAlert("Post removed", "success"));
		dispatch(getCurrentProfile());
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Add Post

export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post("/api/posts", formData, config);

		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert("Post created", "success"));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Get Post

export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${id}`);

		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};
//Add Comment

export const addComment = (postId, formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		);

		dispatch({
			type: ADD_COMMENT,
			payload: {
				postId,
				comments: res.data,
			},
		});

		dispatch(setAlert("Comment Added", "success"));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};

//Delete Comment

export const deleteComment = (commentId, postId) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({
			type: REMOVE_COMMENT,
			payload: {
				commentId,
				postId,
			},
		});

		dispatch(setAlert("Comment Removed", "success"));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.data.msg,
				status: error.response.status,
			},
		});
	}
};
