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
import MessageIcon from "@material-ui/icons/Message";
import DeleteMenu from "./DeleteMenu";
import Comment from "./Comment";

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
const PostItem = () => {
	const classes = useStyles();
	const commentPanel = useRef();
	const [comment, setComment] = useState(false);
	const [like, setLike] = useState(false);

	const toggleComments = () => {
		comment ? setComment(false) : setComment(true);
	};
	const toggleLikes = () => {
		like ? setLike(false) : setLike(true);
	};

	return (
		<div className={classes.postComponent}>
			<div style={{ position: "absolute", right: ".5rem", top: "" }}>
				<DeleteMenu />
			</div>

			<div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "1.5rem",
						padding: "1.5rem",
					}}
				>
					<img
						style={{ height: "5rem", width: "5rem" }}
						src='./images/avatar.png'
						alt=''
					/>
					<div>
						<p style={{ fontWeight: "bold" }}>AntiClock Minds</p>
						<p style={{ fontWeight: "lighter", marginTop: "-.5rem" }}>
							2 hours ago
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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
					sapiente, odio totam minima, cum nobis maxime voluptate placeat a odit
					eaque? Lorem,
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
								marginRight: ".5rem",
								cursor: "pointer",
								fill: like ? "red" : "black",
							}}
							onClick={toggleLikes}
						/>
						Like (3)
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
						Discussion (4)
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

export default PostItem;
