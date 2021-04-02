import React, { useState, useEffect, Fragment } from "react";

import Spinner from "../components/layouts/Spinner";

import { connect } from "react-redux";

import { getCurrentProfile } from "../actions/profile";
import { createProfile } from "../actions/profile";
import { createAvatar } from "../actions/profile";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Material-UI
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

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});
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
const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>Edit your Profile</Typography>
			{onClose ? (
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const Profile = ({
	profile: { profile, loading },

	getCurrentProfile,
	createProfile,
	createAvatar,

	match,
}) => {
	const initialState = {
		artistName: "",
		genre: "",
		equipments: "",
		bio: "",
		website: "",
		youtube: "",
		twitter: "",
		facebook: "",
		instagram: "",
		soundcloud: "",
		spotify: "",
		amazonMusic: "",
		appleMusic: "",
	};

	const [formData, setFormData] = useState(initialState);
	const [photo, setPhoto] = useState(null);
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [openPhoto, setOpenPhoto] = useState(false);
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (!profile) getCurrentProfile();

		if (profile && !loading) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			// if (Array.isArray(profileData.equipments))
			// 	profileData.equipments = profileData.equipments.join(", ");
			setFormData(profileData);
		}
	}, [loading, profile, getCurrentProfile]);

	const {
		artistName,
		genre,
		equipments,
		bio,
		website,
		soundcloud,
		amazonMusic,
		spotify,
		appleMusic,

		twitter,
		facebook,
		youtube,
		instagram,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		createProfile(formData, match.params.id);

		setOpen(false);

		// window.location.reload();
	};

	const submitPhoto = (e) => {
		e.preventDefault();
		if (!photo) {
			return;
		}
		createAvatar(photo, match.params.id);

		setOpenPhoto(false);
	};
	const handleEditOpen = () => {
		setOpen(true);
	};
	const handleEditPhotoOpen = () => {
		setOpenPhoto(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handlePhotoClose = () => {
		setOpenPhoto(false);
	};
	const handlePic = (e) => {
		let reader = new FileReader();

		reader.onloadend = () => {
			setFile(reader.result);
		};

		reader.readAsDataURL(e.target.files[0]);

		const data = new FormData();
		const image = e.target.files[0];
		data.append("avatar", image);

		setPhoto(data);
	};

	return !profile || loading ? (
		<Spinner />
	) : (
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
						src={
							profile.avatar &&
							profile.avatar.avatar &&
							`../images/${profile.avatar.avatar}`
						}
						alt=''
					/>

					<Button onClick={handleEditPhotoOpen} variant='outlined'>
						Edit Photo
					</Button>
				</div>
				<Dialog
					onClose={handlePhotoClose}
					aria-labelledby='customized-dialog-title'
					open={openPhoto}
				>
					<DialogContent dividers>
						<form
							style={{
								display: "grid",
								alignItems: "start",
								gridTemplateColumns: "repeat(2, max-content)",
								gap: "1rem",
								marginBottom: "2rem",
							}}
							onSubmit={submitPhoto}
						>
							<div style={{}}>
								<Avatar
									style={{
										width: "6rem",
										height: "6rem",

										margin: "auto",
									}}
									src={file}
								/>
								<label htmlFor='contained-button-file'>
									<Button
										style={{ marginTop: ".5rem" }}
										variant='contained'
										color='primary'
										component='span'
									>
										Upload Photo
									</Button>
								</label>
							</div>
							{/* <div
										style={{
											display: "flex",
											flexDirection: "column",
											flexWrap: "wrap",
										}}
									> */}
							<input
								style={{
									margin: ".5rem 0",
									alignSelf: "center",
									display: "none",
								}}
								type='file'
								id='contained-button-file'
								accept='image/*'
								name='photo'
								onChange={handlePic}
							/>
							<Button variant='outlined' type='submit'>
								Save
							</Button>
							{/* <input style={{ alignSelf: "start" }} type='submit'></input> */}
							{/* </div> */}
						</form>
					</DialogContent>
				</Dialog>
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
							{profile.artistName}
						</Typography>

						<EditIcon style={{ cursor: "pointer" }} onClick={handleEditOpen} />

						<Dialog
							onClose={handleClose}
							aria-labelledby='customized-dialog-title'
							open={open}
						>
							<DialogTitle id='customized-dialog-title' onClose={handleClose}>
								Modal title
							</DialogTitle>
							<DialogContent dividers>
								<form onSubmit={onSubmit}>
									<div className={classes.root}>
										<div>
											<TextField
												label='Display name'
												variant='outlined'
												name='artistName'
												value={artistName}
												onChange={onChange}
												required
											/>
											<TextField
												name='equipments'
												value={equipments}
												onChange={onChange}
												label='Equipments'
												variant='outlined'
											/>
											<TextField
												name='genre'
												value={genre}
												onChange={onChange}
												label='Genre'
												variant='outlined'
											/>

											<TextField
												name='website'
												value={website}
												onChange={onChange}
												label='Website'
												variant='outlined'
											/>

											{/* <TextField label='Website' variant='outlined' /> */}
											<TextField
												name='spotify'
												value={spotify}
												onChange={onChange}
												label='Spotify Profile'
												variant='outlined'
											/>
											<TextField
												name='amazonMusic'
												value={amazonMusic}
												onChange={onChange}
												label='Amazon Music Profile'
												variant='outlined'
											/>
											<TextField
												name='appleMusic'
												value={appleMusic}
												onChange={onChange}
												label='Apple Music Profile'
												variant='outlined'
											/>
											<TextField
												name='youtube'
												value={youtube}
												onChange={onChange}
												label='Youtube Profile'
												variant='outlined'
											/>
											<TextField
												name='soundcloud'
												value={soundcloud}
												onChange={onChange}
												label='Soundcloud Profile'
												variant='outlined'
											/>
											<TextField
												name='facebook'
												value={facebook}
												onChange={onChange}
												label='Facebook'
												variant='outlined'
											/>
											<TextField
												name='twitter'
												value={twitter}
												onChange={onChange}
												label='Twitter'
												variant='outlined'
											/>
											<TextField
												name='instagram'
												value={instagram}
												onChange={onChange}
												label='Instagram'
												variant='outlined'
											/>
											<TextField
												multiline
												name='bio'
												value={bio}
												onChange={onChange}
												style={{ width: "100%" }}
												label='About'
												variant='outlined'
												margin='normal'
											/>
										</div>
									</div>
									<Button type='submit' autoFocus color='primary'>
										Save
									</Button>
								</form>
							</DialogContent>
							<DialogActions></DialogActions>
						</Dialog>
					</div>
					<div className={classes.links}>
						<Typography variant='caption'>
							{" "}
							<Fragment>
								<strong>Website: </strong>
								<a
									target='_blank'
									rel='noreferrer'
									href={"https://" + profile.website}
								>
									{profile.website}
								</a>{" "}
							</Fragment>
						</Typography>

						<Typography variant='caption'>
							{" "}
							{profile.social && profile.social.spotify && (
								<Fragment>
									<strong>Spotify: </strong>
									<a
										target='_blank'
										rel='noreferrer'
										href={"https://" + profile.social.spotify}
									>
										{profile.social.spotify}
									</a>
								</Fragment>
							)}
						</Typography>

						<Typography variant='caption'>
							{" "}
							{profile.social && profile.social.amazonMusic && (
								<Fragment>
									<strong>Amazon Music: </strong>
									<a
										target='_blank'
										rel='noreferrer'
										href={"https://" + profile.social.amazonMusic}
									>
										{profile.social.amazonMusic}
									</a>
								</Fragment>
							)}
						</Typography>

						<Typography variant='caption'>
							{" "}
							{profile.social && profile.social.appleMusic && (
								<Fragment>
									<strong>Apple Music: </strong>
									<a
										target='_blank'
										rel='noreferrer'
										href={"https://" + profile.social.appleMusic}
									>
										{profile.social.appleMusic}
									</a>
								</Fragment>
							)}
						</Typography>
						<Typography variant='caption'>
							{" "}
							{profile.social && profile.social.youtube && (
								<Fragment>
									<strong>Youtube: </strong>
									<a
										target='_blank'
										rel='noreferrer'
										href={"https://" + profile.social.youtube}
									>
										{profile.social.youtube}
									</a>
								</Fragment>
							)}
						</Typography>
						<Typography variant='caption'>
							{" "}
							{profile.social && profile.social.soundcloud && (
								<Fragment>
									<strong>Soundcloud: </strong>
									<a
										target='_blank'
										rel='noreferrer'
										href={"https://" + profile.social.soundcloud}
									>
										{profile.social.soundcloud}
									</a>
								</Fragment>
							)}
						</Typography>
					</div>
					<div>
						<Typography variant='subtitle1'>
							{" "}
							<strong>Genre: </strong> {profile.genre}
						</Typography>
					</div>
					<div>
						<Typography variant='subtitle1'>
							<strong>Equipments:</strong> {profile.equipments}
						</Typography>
					</div>
					<div style={{ marginTop: ".5rem" }}>
						{profile.social && profile.social.facebook && (
							<a
								target='_blank'
								rel='noreferrer'
								href={"https://" + profile.social.facebook}
							>
								<FacebookIcon style={{ fill: "blue", cursor: "pointer" }} />
							</a>
						)}
						{profile.social && profile.social.twitter && (
							<a
								target='_blank'
								rel='noreferrer'
								href={"https://" + profile.social.twitter}
							>
								<TwitterIcon style={{ fill: "blue", cursor: "pointer" }} />
							</a>
						)}
						{profile.social && profile.social.instagram && (
							<a
								target='_blank'
								rel='noreferrer'
								href={"https://" + profile.social.instagram}
							>
								<InstagramIcon style={{ fill: "orange", cursor: "pointer" }} />
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

			<Container maxWidth='md' style={{ textAlign: "center", maxWidth: "90%" }}>
				<Typography variant='subtitle1'>{profile.bio}</Typography>
			</Container>
			<Divider style={{ width: "20%", margin: " 2rem  auto" }} />
		</Fragment>
	);
};

Profile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	createAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, {
	createProfile,
	getCurrentProfile,
	createAvatar,
})(Profile);
