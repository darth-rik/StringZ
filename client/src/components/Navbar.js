import React, { Fragment, useEffect } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Dialog from "@material-ui/core/Dialog";

import MuiDialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import Notification from "./dashboard/notification/Notification";
import AutoComplete from "./dashboard/AutoComplete";

import img from "../images/avatar.png";
import LogoBlack from "../images/logo-black.png";
import PostInput from "./PostInput";

import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { searchProfile } from "../actions/profile";
import { getCurrentProfile } from "../actions/profile";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},

	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},

	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("lg")]: {
			marginLeft: theme.spacing(50),
			width: "40%",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},

	postInput: {
		width: "70vw",
		height: "15rem",

		[theme.breakpoints.up("md")]: {
			width: "30vw",
			overflow: "hidden",
		},
	},
	autoSuggestList: {
		position: "absolute",
		zIndex: "2",
		backgroundColor: "white",
		boxShadow: ".5rem .5rem 2rem rgba(0,0,0,.3)",
		overflowY: "scroll",
		borderRadius: "0 0  .5rem .5rem",
		maxHeight: "30rem",
		width: "100%",
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
			padding: "0 5rem",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));
const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const Navbar = ({
	logout,
	profile: { profiles, profile },
	searchProfile,
	getCurrentProfile,
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [notifEl, setNotifEl] = React.useState(null);
	const [value, setValue] = React.useState("");
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [close, setClose] = React.useState(false);

	const handlePostOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const isMenuOpen = Boolean(anchorEl);
	const isNotifOpen = Boolean(notifEl);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleNotificationOpen = (event) => {
		setNotifEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setNotifEl(null);
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogout = () => {
		handleMenuClose();
		logout();
	};

	const search = (e) => {
		if (e.target.value === "") {
			setClose(true);
			return;
		}

		setClose(false);

		searchProfile(e.target.value);
	};

	const closeList = () => {
		setClose(true);
		setValue("");
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link style={{ color: "black" }} to={`/profile`}>
				{" "}
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			</Link>
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	);

	const renderNotif = (
		<Menu
			anchorEl={notifEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id='open-notification'
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isNotifOpen}
			onClose={handleMenuClose}
			style={{ width: "100vw" }}
		>
			<div>
				<Notification close={handleMenuClose} profiles={profile} />
			</div>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleNotificationOpen}>
				<IconButton
					aria-controls='open-notification'
					aria-label='show 11 new notifications'
					color='inherit'
					aria-haspopup='true'
				>
					<Badge
						badgeContent={
							profile &&
							profile.notification.filter((el) => el.read === false).length
						}
						color='secondary'
					>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>{profile ? profile.artistName : "User1234"}</p>
			</MenuItem>
			<MenuItem onClick={handlePostOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AddIcon />
				</IconButton>
				<p>Write a post</p>
			</MenuItem>
		</Menu>
	);

	return profile ? (
		<div className={classes.grow}>
			<AppBar position='fixed'>
				<Toolbar>
					<Link to='/dashboard'>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							// aria-label='open drawer'
						>
							<img
								src={LogoBlack}
								style={{ height: "2rem", width: "2rem" }}
								alt=''
							/>
						</IconButton>
					</Link>

					<div style={{ width: "100%" }}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								onKeyUp={search}
								onChange={onChange}
								value={value}
								style={{ width: "100%" }}
								placeholder='Search for artists/bands…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
							/>
							{profiles.length > 0 && (
								<div
									onClick={closeList}
									style={{ display: close ? "none" : "block" }}
									className={classes.autoSuggestList}
								>
									{profiles.map((data) => (
										<AutoComplete
											key={data._id}
											data={data}
											close={closeList}
										/>
									))}
								</div>
							)}
						</div>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<Typography variant='subtitle2'>
								{profile ? profile.artistName : "User1234"}
							</Typography>
							<Avatar
								src={
									profile.avatar.avatar && `/images/${profile.avatar.avatar}`
								}
								style={{ margin: " 0 1rem" }}
								alt=''
							/>
						</IconButton>
						<IconButton
							aria-controls='open-notification'
							aria-label='show 17 new notifications'
							color='inherit'
							onClick={handleNotificationOpen}
						>
							<Badge
								badgeContent={
									profile.notification.filter((el) => el.read === false).length
								}
								color='secondary'
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							aria-controls=''
							aria-label='show 17 new notifications'
							color='inherit'
							onClick={handlePostOpen}
						>
							<AddIcon />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar />
			{renderMobileMenu}
			{renderMenu}
			{renderNotif}
			<Dialog
				maxWidth='xl'
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
			>
				<DialogContent className={classes.postInput} dividers>
					<div>
						<PostInput closePost={handleClose} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	) : null;
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	searchProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, {
	logout,
	searchProfile,
	getCurrentProfile,
})(Navbar);
