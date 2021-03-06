import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/layouts/Spinner";

import { connect } from "react-redux";

import { getProfileById } from "../actions/profile";
import { createProfile } from "../actions/profile";
import { createAvatar } from "../actions/profile";

import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import EditIcon from "@material-ui/icons/Edit";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
	links: {
		display: "grid",
		gap: ".5rem",
		margin: "1rem 0",

		"& a": {
			color: "black",
			"&:hover": {
				color: "red",
			},
		},
	},
}));

const UserProfile = ({
	profile: { profile, user, loading },
	getProfileById,

	match,
}) => {
	const classes = useStyles();

	useEffect(() => {
		getProfileById(match.params.id);
	}, [loading, getProfileById, match.params.id]);

	return (
		<div>
			{user && (
				<>
					{" "}
					<div
						style={{
							backgroundColor: "lightgray",
							height: "10rem",
							position: "relative",
						}}
					>
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, 0%)",
								textAlign: "center",
							}}
						>
							<Avatar
								style={{
									height: "10rem",
									width: "10rem",
									border: "2px solid white",
								}}
								src={user.avatar.avatar && `../images/${user.avatar.avatar}`}
								alt=''
							/>
						</div>
					</div>
					<Container maxWidth='lg' style={{ margin: "8rem auto 3rem" }}>
						<div
							style={{
								margin: "auto",
								textAlign: "center",
								backgroundColor: "",

								padding: "",
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Typography
									variant='h4'
									style={{ fontWeight: "bolder", marginRight: "1rem" }}
								>
									{user && user.artistName}
								</Typography>
							</div>
							<div className={classes.links}>
								<Typography variant='caption'>
									{" "}
									<a href='#'>https://www.anticlock.com</a>{" "}
								</Typography>

								<Typography variant='caption'>
									{" "}
									{user.social.spotify && (
										<a href='#'> https://www.spotify.com</a>
									)}
								</Typography>

								<Typography variant='caption'>
									{" "}
									{user.social.amazonMusic && (
										<a href='#'> https://www.amazonmusic.com</a>
									)}
								</Typography>

								<Typography variant='caption'>
									{" "}
									{user.social.appleMusic && (
										<a href='#'> https://www.applemusic.com</a>
									)}
								</Typography>
								<Typography variant='caption'>
									{" "}
									{user.social.youtube && (
										<a href='#'> https://www.applemusic.com</a>
									)}
								</Typography>
								<Typography variant='caption'>
									{" "}
									{user.social.soundcloud && (
										<a href='#'> https://www.applemusic.com</a>
									)}
								</Typography>
							</div>
							<div>
								<Typography variant='subtitle1'>
									{" "}
									<strong>Genre: </strong> {user && user.genre}
								</Typography>
							</div>
							<div>
								<Typography variant='subtitle1'>
									<strong>Equipments:</strong>{" "}
									{user && user.equipments.map((el) => el).join(" , ")}
								</Typography>
							</div>
							<div style={{ marginTop: ".5rem" }}>
								{user.social.facebook && (
									<FacebookIcon style={{ fill: "blue", cursor: "pointer" }} />
								)}
								{user.social.twitter && (
									<TwitterIcon style={{ fill: "blue", cursor: "pointer" }} />
								)}
								{user.social.instagram && (
									<InstagramIcon
										style={{ fill: "orange", cursor: "pointer" }}
									/>
								)}
							</div>

							{/* <div style={{ marginTop: "1rem" }}>
								<Button
									variant='contained'
									color='primary'
									disableElevation
									style={{ marginRight: "1rem" }}
								>
									Follow
								</Button>
								<Button variant='contained' color='default' disableElevation>
									Message
								</Button>
							</div> */}
						</div>
					</Container>
					<Container
						maxWidth='md'
						style={{ textAlign: "center", maxWidth: "50%" }}
					>
						{/* <Typography style={{ textAlign: "center" }} variant='h5'>
							About
						</Typography> */}
						<Typography variant='subtitle1'>{user && user.bio}</Typography>
					</Container>
					<Divider style={{ width: "20%", margin: " 2rem  auto" }} />
				</>
			)}
		</div>
	);
};

UserProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, {
	getProfileById,
})(UserProfile);
