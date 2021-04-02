import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import BackDrop from "../components/layouts/BackDrop";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import { getPosts } from "../actions/post";
import PostItem from "../components/postBody/PostItem";
import Spinner from "../components/layouts/Spinner";

const Dashboard = ({
	profile: { profile, loading },
	getPosts,
	post: { posts },
}) => {
	useEffect(() => {
		getPosts();
	}, [loading, getPosts]);
	return loading && profile == null ? (
		<Spinner />
	) : !profile ? (
		<BackDrop />
	) : (
		<div>
			<Container style={{ margin: "1rem auto" }} maxWidth='lg'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</Container>
		</div>
	);
};

Dashboard.propTypes = {
	profile: PropTypes.object,
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	post: state.post,
});
export default connect(mapStateToProps, {
	loadUser,
	getPosts,
})(Dashboard);
