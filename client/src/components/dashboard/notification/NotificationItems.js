import React from "react";

import Moment from "react-moment";
import { readNotification } from "../../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Material-UI
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	mobileSection: {
		padding: "1rem 2rem",
		backgroundColor: "",
		display: "flex",
		flexDirection: "column",
		justifyItems: "center",

		[theme.breakpoints.up("lg")]: {
			display: "grid",
			gridTemplateColumns: "repeat(3,1fr)",
			gap: "1rem",
			justifyItems: "center",
		},
	},
}));

const NotificationItems = ({ notification, readNotification, close }) => {
	const classes = useStyles();

	const onClick = () => {
		readNotification(notification._id);
		close();
	};

	return (
		<Link to={`/post/${notification.postId}`}>
			<MenuItem style={{}} className={classes.mobileSection} onClick={onClick}>
				<img
					style={{
						height: "3rem",
						width: "3rem",
						borderRadius: "50rem",
						// marginRight: "3rem",
					}}
					src={`../images/${notification.avatar}`}
					// src=''
					alt=''
				/>
				<Typography
					style={{
						textAlign: "center",
						whiteSpace: "pre-line",
						padding: "1rem",
					}}
				>
					<strong>{notification.name}</strong> has{" "}
					{notification.message === "like" ? "liked" : "commented on"} your post
				</Typography>
				<Typography variant='caption'>
					<Moment fromNow date={notification.date} />
				</Typography>
			</MenuItem>

			<Divider />
		</Link>
	);
};

NotificationItems.propTypes = {
	readNotification: PropTypes.func.isRequired,
};

export default connect(null, { readNotification })(NotificationItems);
