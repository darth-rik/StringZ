import { Button, Container, TextField, Typography } from "@material-ui/core";
import React from "react";
import LogoWhite from "../images/logo-white.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		margin: "5rem auto",
		textAlign: "center",
		display: "grid",
		gridTemplateRows: "repeat(5, 1fr)",
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
const Info = () => {
	const classes = useStyles();
	return (
		<form className={classes.root}>
			<img src={LogoWhite} style={{ height: "3rem", width: "3rem" }} alt='' />

			<Typography variant='h4' style={{ fontWeight: "600" }}>
				Almost There!
			</Typography>

			<div style={{ width: "100%" }}>
				<TextField
					variant='outlined'
					label='Band Name / Artist Name'
					name='name'
					className={classes.textInputs}
					//
					required
				/>

				<Typography variant='subtitle1' style={{ marginTop: ".5rem" }}>
					{" "}
					This name will be visible to everyone
				</Typography>
			</div>
			<TextField
				variant='outlined'
				label='Genre'
				name='name'
				className={classes.textInputs}
			/>
			<TextField
				variant='outlined'
				label='Equipments '
				name='name'
				className={classes.textInputs}
			/>
			<Button type='submit' variant='contained' color='primary' size='large'>
				Done
			</Button>
		</form>
	);
};

export default Info;
