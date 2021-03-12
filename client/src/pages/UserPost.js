import React, { Fragment, useEffect } from "react";
import { getPost } from "../actions/post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../components/layouts/Spinner";
import PostItem from "../components/dashboard/post body/PostItem";
import { Container } from "@material-ui/core";

const UserPost = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<Container style={{ margin: "1rem auto" }} maxWidth='lg'>
			<PostItem post={post} />
		</Container>
	);
};

UserPost.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPost })(UserPost);
