import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Divider,
	Container,
	Avatar,
	TextField,
	Button,
	Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import MessageIcon from "@material-ui/icons/Message";
import DeleteMenu from "./DeleteMenu";
import Comment from "./Comment";

import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../../actions/post";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	postComponent: {
		backgroundColor: "",
		border: "1px solid rgba(0,0,0,0.1) ",
		boxShadow: ".2rem .2rem .5rem rgba(0,0,0,.3)",
		width: "100%",
		position: "relative",
		margin: "auto",
	},
	[theme.breakpoints.up("md")]: {
		postComponent: {
			width: "70%",
		},
	},
}));
const PostItem = ({
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
	addLike,
	removeLike,
}) => {
	const classes = useStyles();
	const commentPanel = useRef();
	const [comment, setComment] = useState(false);
	const [like, setLike] = useState(false);

	const toggleComments = () => {
		comment ? setComment(false) : setComment(true);
	};
	const addLikes = () => {
		setLike(true);
		addLike(_id);
	};
	const removeLikes = () => {
		removeLike(_id);

		setLike(false);
	};

	return (
		<div className={classes.postComponent}>
			{!auth.loading && user === auth.user._id && (
				<div style={{ position: "absolute", right: ".5rem", top: "" }}>
					<DeleteMenu id={_id} />
				</div>
			)}

			<div>
				<div
					style={{
						display: "flex",
						alignItems: "center",

						padding: "1.5rem",
					}}
				>
					<Avatar
						style={{ height: "5rem", width: "5rem", marginRight: "1.5rem" }}
						src={`./images/${avatar}`}
						alt=''
					/>
					<div>
						<p style={{ fontWeight: "bold" }}>{name}</p>
						<p style={{ fontWeight: "lighter", marginTop: "-.5rem" }}>
							<Moment format='YYYY/MM/DD'>{date}</Moment>
						</p>
					</div>
				</div>

				<Typography
					style={{
						width: "90%",
						margin: "auto",
						marginBottom: "1rem",
						lineHeight: "1.5rem",
					}}
					variant='subtitle1'
				>
					{text}
				</Typography>

				<Divider style={{ width: "50%", margin: "auto", padding: "" }} />

				<ul
					style={{
						padding: "2rem",
						display: "flex",
						justifyContent: "space-around",
						listStyle: "none",
					}}
				>
					<li
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<ThumbUpAltIcon
							style={{
								marginRight: ".1rem",
								cursor: "pointer",
							}}
							onClick={addLikes}
						/>
						({likes.length}){" "}
						<ThumbDownAltIcon
							style={{
								marginRight: ".5rem",
								cursor: "pointer",
							}}
							onClick={removeLikes}
						/>
					</li>
					<li
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<MessageIcon
							style={{
								marginRight: ".5rem",
								cursor: "pointer",
							}}
							onClick={toggleComments}
						/>
						Discussion ({comments.length})
					</li>
				</ul>
			</div>

			<Container
				style={{
					margin: comment ? "2rem 0" : "0",
					maxHeight: comment ? commentPanel.current.scrollHeight + "px" : "0",
					transition: "all .3s ease-out",
					overflow: "hidden",
				}}
				ref={commentPanel}
			>
				<Divider />

				<Comment />

				<Comment />
			</Container>
			<Container style={{ margin: "1rem 0", backgroundColor: "", height: "" }}>
				<div style={{ display: "flex" }}>
					<Avatar
						style={{ height: "4rem", width: "4rem", marginRight: "2rem" }}
					/>
					<div
						style={{ display: "flex", flexDirection: "column", width: "80%" }}
					>
						<TextField
							variant='outlined'
							multiline
							placeholder='Add your thoughts..'
						></TextField>
						<Button
							variant='contained'
							color='primary'
							style={{ marginTop: "1rem", alignSelf: "flex-end" }}
						>
							Post
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
