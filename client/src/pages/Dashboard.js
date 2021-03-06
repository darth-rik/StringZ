import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PostInput from "../components/PostInput";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import BackDrop from "../components/layouts/BackDrop";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";
import PropTypes from "prop-types";

import { getPosts } from "../actions/post";

import PostItem from "../components/dashboard/post body/PostItem";
import Spinner from "../components/layouts/Spinner";

const Dashboard = ({
	getCurrentProfile,
	profile: { profile, loading },
	getPosts,
	post: { posts },
}) => {
	useEffect(() => {
		if (!profile) getCurrentProfile();
		getPosts();
	}, [loading, profile, getCurrentProfile, getPosts]);
	return loading && profile == null ? (
		<Spinner />
	) : !profile ? (
		<BackDrop />
	) : (
		<div>
			{/* <Navbar /> */}
			<Container style={{ margin: "1rem auto" }} maxWidth='lg'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</Container>
		</div>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object,
	auth: PropTypes.object,
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
	post: state.post,
});
export default connect(mapStateToProps, {
	getCurrentProfile,
	loadUser,
	getPosts,
})(Dashboard);
