import React from "react";
import {
	Container,
	Avatar,
	Divider,
	Typography,
	Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/post";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Comment = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment,
}) => {
	const onClick = () => {
		deleteComment(_id, postId);
	};
	return (
		<Container>
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Avatar
					style={{ width: "3rem", height: "3rem", marginRight: "1.5rem" }}
					src={`../images/${avatar}`}
				/>
				<div style={{ marginRight: "auto" }}>
					<p>{name}</p>
					<p
						style={{
							marginTop: "-.5rem",
							fontWeight: "lighter",
						}}
					>
						<Moment fromNow date={date} />
					</p>
				</div>
				{!auth.loading && user === auth.user._id && (
					<Button
						variant='contained'
						disableElevation
						color='secondary'
						size='small'
						onClick={onClick}
					>
						{" "}
						Delete
					</Button>
				)}
			</div>
			<Typography
				style={{
					width: "90%",
					margin: "auto",
					marginBottom: "1rem",
					lineHeight: "1.5rem",
					marginTop: "1rem",
					wordWrap: "break-word",
				}}
				variant='body2'
			>
				{text}
			</Typography>

			<Divider />
		</Container>
	);
};

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
