import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LogoWhite from "../images/logo-white.png";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		margin: "5rem auto",
		textAlign: "center",
		display: "grid",
		gridTemplateRows: "repeat(5, 1fr)",
		gap: "2rem",
		alignItems: "center",
		justifyItems: "center",
	},

	textInputs: {
		width: "80%",
	},

	[theme.breakpoints.up("md")]: {
		root: {
			width: "50%",
		},
		textInputs: {
			width: "40%",
		},
	},
}));

const Register = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<img src={LogoWhite} style={{ height: "3rem", width: "3rem" }} alt='' />
			<Typography variant='h5' style={{ fontWeight: "bolder" }}>
				Register
			</Typography>

			<TextField
				variant='outlined'
				label='Band Name / Artist Name'
				className={classes.textInputs}
			/>

			<TextField
				variant='outlined'
				label='Genre'
				className={classes.textInputs}
			/>

			<TextField
				variant='outlined'
				label='email'
				className={classes.textInputs}
			/>
			<TextField
				variant='outlined'
				label='password'
				className={classes.textInputs}
			/>

			<Button variant='contained' color='primary' size='large'>
				Register
			</Button>
			<a href='/'>Back to Home</a>
		</div>
	);
};

export default Register;
