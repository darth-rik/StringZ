import React, { useState } from "react";
import Navbar from "../components/Navbar";

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

const Profile = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);

	const handleEditOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handlePic = (event) => {
		setFile(URL.createObjectURL(event.target.files[0]));
	};
	return (
		<div>
			<Navbar />
			<div
				style={{
					backgroundColor: "lightgray",
					height: "10rem",
					position: "relative",
				}}
			>
				<Avatar
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, 0%)",
						height: "10rem",
						width: "10rem",
						border: "2px solid white",
					}}
				/>
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
							Anticlock Minds
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
								<form
									style={{
										display: "grid",
										alignItems: "start",
										gridTemplateColumns: "repeat(2, max-content)",
										gap: "1rem",
										marginBottom: "2rem",
									}}
								>
									<div style={{}}>
										<Avatar
											style={{
												width: "6rem",
												height: "6rem",
												marginBottom: ".5rem",
											}}
											src={file}
										/>
										<Typography varaint='caption'>Change Photo</Typography>
									</div>
									{/* <div
										style={{
											display: "flex",
											flexDirection: "column",
											flexWrap: "wrap",
										}}
									> */}
									<input
										style={{ margin: ".5rem 0", alignSelf: "center" }}
										type='file'
										id='img'
										accept='image/*'
										onChange={handlePic}
									></input>
									{/* <input style={{ alignSelf: "start" }} type='submit'></input> */}
									{/* </div> */}
								</form>
								<form className={classes.root} noValidate autoComplete='off'>
									<div>
										<TextField
											label='Band Name / Artist Name'
											variant='outlined'
										/>
										<TextField required label='Equipments' variant='outlined' />
										<TextField required label='Genre' variant='outlined' />

										<TextField label='Website' variant='outlined' />
										<TextField label='Spotify Profile' variant='outlined' />
										<TextField
											label='Amazon Music Profile'
											variant='outlined'
										/>
										<TextField label='Apple Music Profile' variant='outlined' />
										<TextField label='Facebook' variant='outlined' />
										<TextField label='Twitter' variant='outlined' />
										<TextField label='Instagram' variant='outlined' />
										<TextField
											multiline
											style={{ width: "100%" }}
											label='About'
											variant='outlined'
											margin='normal'
										/>
									</div>
								</form>
							</DialogContent>
							<DialogActions>
								<Button autoFocus onClick={handleClose} color='primary'>
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</div>

					<Typography variant='caption'>
						{" "}
						<a href='#'>https://www.anticlock.com</a>{" "}
					</Typography>
					<div>
						<Typography variant='caption'>
							{" "}
							<a href='#'> https://www.spotify.com</a>
						</Typography>
					</div>
					<div>
						<Typography variant='caption'>
							{" "}
							<a href='#'> https://www.amazonmusic.com</a>
						</Typography>
					</div>
					<div>
						<Typography variant='caption'>
							{" "}
							<a href='#'> https://www.applemusic.com</a>
						</Typography>
					</div>
					<div>
						<Typography variant='subtitle1'>
							{" "}
							<strong>Genre: </strong> Rock
						</Typography>
					</div>
					<div>
						<Typography variant='subtitle1'>
							<strong>Equipments:</strong> Nektar Keyboards, Ibanez guitars,
							M-audio sound card, Panasonic Headphones
						</Typography>
					</div>
					<div style={{ marginTop: ".5rem" }}>
						<FacebookIcon style={{ fill: "blue", cursor: "pointer" }} />
						<TwitterIcon style={{ fill: "blue", cursor: "pointer" }} />
						<InstagramIcon style={{ fill: "orange", cursor: "pointer" }} />
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

			<Container maxWidth='md' style={{ textAlign: "center" }}>
				{/* <Typography style={{ textAlign: "center" }} variant='h5'>
					About
				</Typography> */}
				<Typography variant='subtitle1'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
					consequuntur assumenda recusandae impedit, doloremque tempora
					suscipit, ex
				</Typography>
			</Container>
			<Divider style={{ width: "20%", margin: " 2rem  auto" }} />
		</div>
	);
};

export default Profile;
