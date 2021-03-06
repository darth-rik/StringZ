import React from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../images/background.png";
import { Button, Container, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import LogoWhite from "../images/logo-white.png";
import LogoBlack from "../images/logo-black.png";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundImage: `url(${Image})`,
		backgroundSize: "cover",
		height: "100vh",
		color: "white",
		overflowY: "scroll",
		[theme.breakpoints.up("md")]: {
			overflowY: "hidden",
		},
	},
	list: {
		width: 250,
		textAlign: "center",
	},
	fullList: {
		width: "auto",
	},

	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",

		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

const Home = ({ isAuthenticated }) => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		left: false,
	});
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<img
				src={LogoWhite}
				alt=''
				style={{
					height: "4rem",
					width: "4rem",

					margin: "auto",
				}}
			/>

			<Divider />
			<List style={{ marginTop: "2rem" }}>
				<Link to='/register' style={{ color: "black" }}>
					<ListItem button>
						<ListItemText primary='Register' />
					</ListItem>
				</Link>

				<Link to='/login' style={{ color: "black" }}>
					<ListItem button>
						<ListItemText primary='Login' />
					</ListItem>
				</Link>
			</List>
		</div>
	);

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
		// props.history.push("/dashboard");
	}
	return (
		<div className={classes.root}>
			<Container
				maxWidth='xl'
				style={{
					fontWeight: "600",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop: "2rem",
				}}
			>
				<img
					src={LogoBlack}
					alt=''
					style={{ marginLeft: "2rem" }}
					className={classes.sectionDesktop}
				/>

				<ul
					className={classes.sectionDesktop}
					style={{
						listStyle: "none",
						alignItems: "center",
						fontSize: "1.2rem",
					}}
				>
					<Link to='/register'>
						{" "}
						<li
							style={{
								marginRight: "4rem",
								cursor: "pointer",
							}}
						>
							{" "}
							Register
						</li>
					</Link>
					<Link to='/login'>
						{" "}
						<li style={{ marginRight: "4rem", cursor: "pointer" }}>Login</li>
					</Link>
				</ul>

				{/** Hamburger Menu on mobile view*/}

				<Button
					onClick={toggleDrawer("left", true)}
					style={{ position: "absolute", left: "1rem", top: "1rem" }}
					className={classes.sectionMobile}
				>
					<MenuIcon
						style={{
							fontSize: "3rem",
							fill: "white",
							position: "absolute",
							left: "1rem",
							top: "1rem",
						}}
					/>
				</Button>
				<Drawer
					anchor='left'
					open={state["left"]}
					onClose={toggleDrawer("left", false)}
				>
					{list("left")}
				</Drawer>
			</Container>

			{/* Text Body */}

			<Container
				maxWidth='lg'
				style={{
					marginTop: "10rem",
					textAlign: "center",
					marginBottom: "2rem",
				}}
			>
				<Typography
					variant='h3'
					style={{ fontWeight: "700", marginBottom: "4rem" }}
				>
					StringZ
				</Typography>
				<Typography
					variant='h6'
					style={{
						fontWeight: "400",
						marginBottom: "3rem",
						letterSpacing: ".15rem",
					}}
				>
					Create your profile and connect with musicians from around the world
				</Typography>
				<Link to='/register'>
					<Button
						variant='contained'
						color='secondary'
						style={{ marginRight: "1.5rem" }}
						size='large'
					>
						SignUp
					</Button>
				</Link>
				<Link to='/login'>
					<Button variant='contained' size='large'>
						Login
					</Button>
				</Link>
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
