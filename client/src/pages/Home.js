import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Image from "../images/background-min.png";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";

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
	logo: {
		height: "4rem",
		width: "4rem",
		padding: "1rem",
		margin: "auto",
	},
	container: {
		fontWeight: "600",
		display: "flex",
		justifyContent: "space-between",
		paddingTop: "2rem",
	},
	links: {
		marginRight: "4rem",
		cursor: "pointer",
		color: "white",
	},

	menu: {
		fontSize: "3rem",
		fill: "white",
		position: "absolute",
		left: "1rem",
		top: "1rem",
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
			<img src='./images/Logo.svg' className={classes.logo} alt='' />

			<Divider />
			<List style={{ marginTop: "2rem" }}>
				<Link to='/register'>
					<ListItem button>
						<ListItemText primary='Register' />
					</ListItem>
				</Link>

				<Link to='/login'>
					<ListItem button>
						<ListItemText primary='Login' />
					</ListItem>
				</Link>
			</List>
		</div>
	);

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className={classes.root}>
			<Container maxWidth='xl' className={classes.container}>
				<img
					src='./images/Logo.svg'
					style={{
						backgroundColor: "white",
						height: "4rem",
						width: "4rem",
					}}
					alt=''
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
						<li className={classes.links}> Register</li>
					</Link>
					<Link to='/login'>
						{" "}
						<li className={classes.links}>Login</li>
					</Link>
				</ul>

				{/** Hamburger Menu on mobile view*/}

				<Button
					onClick={toggleDrawer("left", true)}
					style={{ position: "absolute", left: "1rem", top: "1rem" }}
					className={classes.sectionMobile}
				>
					<MenuIcon className={classes.menu} />
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
