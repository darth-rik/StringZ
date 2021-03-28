import React, { useEffect, Fragment } from "react";

import Spinner from "../components/layouts/Spinner";

import { connect } from "react-redux";

import { getProfileById } from "../actions/profile";

import PropTypes from "prop-types";

//Material-UI
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

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
	profile: { user, loading },

	getProfileById,

	match,
}) => {
	const classes = useStyles();

	useEffect(() => {
		getProfileById(match.params.id);
	}, [loading, match.params.id]);

	return !user || loading ? (
		<Spinner />
	) : (
		user && (
			<Fragment>
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
							src={`../images/${user.avatar.avatar}`}
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
								{user.artistName}
							</Typography>
						</div>
						<div className={classes.links}>
							<Typography variant='caption'>
								{" "}
								<Fragment>
									<strong>Website: </strong>
									<a
										target='_blank'
										rel='noreferrer'
										href={"https://" + user.website}
									>
										{user.website}
									</a>{" "}
								</Fragment>
							</Typography>

							<Typography variant='caption'>
								{" "}
								{user.social && user.social.spotify && (
									<Fragment>
										<strong>Spotify: </strong>
										<a
											target='_blank'
											rel='noreferrer'
											href={"https://" + user.social.spotify}
										>
											{user.social.spotify}
										</a>
									</Fragment>
								)}
							</Typography>

							<Typography variant='caption'>
								{" "}
								{user.social && user.social.amazonMusic && (
									<Fragment>
										<strong>Amazon Music: </strong>
										<a
											target='_blank'
											rel='noreferrer'
											href={"https://" + user.social.amazonMusic}
										>
											{user.social.amazonMusic}
										</a>
									</Fragment>
								)}
							</Typography>

							<Typography variant='caption'>
								{" "}
								{user.social && user.social.appleMusic && (
									<Fragment>
										<strong>Apple Music: </strong>
										<a
											target='_blank'
											rel='noreferrer'
											href={"https://" + user.social.appleMusic}
										>
											{user.social.appleMusic}
										</a>
									</Fragment>
								)}
							</Typography>
							<Typography variant='caption'>
								{" "}
								{user.social && user.social.youtube && (
									<Fragment>
										<strong>Youtube: </strong>
										<a
											target='_blank'
											rel='noreferrer'
											href={"https://" + user.social.youtube}
										>
											{user.social.youtube}
										</a>
									</Fragment>
								)}
							</Typography>
							<Typography variant='caption'>
								{" "}
								{user.social && user.social.soundcloud && (
									<Fragment>
										<strong>Soundcloud: </strong>
										<a
											target='_blank'
											rel='noreferrer'
											href={"https://" + user.social.soundcloud}
										>
											{user.social.soundcloud}
										</a>
									</Fragment>
								)}
							</Typography>
						</div>
						<div>
							<Typography variant='subtitle1'>
								{" "}
								<strong>Genre: </strong> {user.genre}
							</Typography>
						</div>
						<div>
							<Typography variant='subtitle1'>
								<strong>Equipments:</strong> {user.equipments}
							</Typography>
						</div>
						<div style={{ marginTop: ".5rem" }}>
							{user.social && user.social.facebook && (
								<a
									target='_blank'
									rel='noreferrer'
									href={"https://" + user.social.facebook}
								>
									<FacebookIcon style={{ fill: "blue", cursor: "pointer" }} />
								</a>
							)}
							{user.social && user.social.twitter && (
								<a
									target='_blank'
									rel='noreferrer'
									href={"https://" + user.social.twitter}
								>
									<TwitterIcon style={{ fill: "blue", cursor: "pointer" }} />
								</a>
							)}
							{user.social && user.social.instagram && (
								<a
									target='_blank'
									rel='noreferrer'
									href={"https://" + user.social.instagram}
								>
									<InstagramIcon
										style={{ fill: "orange", cursor: "pointer" }}
									/>
								</a>
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
				{/* <Divider style={{ width: "70%", margin: "auto" }} /> */}

				<Container
					maxWidth='md'
					style={{ textAlign: "center", maxWidth: "90%" }}
				>
					{/* <Typography style={{ textAlign: "center" }} variant='h5'>
					About
				</Typography> */}
					<Typography variant='subtitle1'>{user.bio}</Typography>
				</Container>
				<Divider style={{ width: "20%", margin: " 2rem  auto" }} />
			</Fragment>
		)
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
