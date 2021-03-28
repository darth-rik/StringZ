import React, { useState } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import PropTypes from "prop-types";

//Material UI
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
		overflow: "scroll",
		padding: "1rem",
	},
	form: {
		width: "100%",
		margin: "5rem auto",
		textAlign: "center",
		display: "grid",
		gridTemplateRows: "repeat(5, 1fr)",
		alignItems: "center",
		justifyItems: "center",
		backgroundColor: "white",
	},
	textInputs: {
		width: "80%",
	},

	[theme.breakpoints.up("md")]: {
		form: {
			width: "50%",
		},
		textInputs: {
			width: "40%",
		},
	},
}));

const BackDrop = ({ createProfile }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);

	const [formData, setFormData] = useState({
		artistName: "",
		website: "",
		bio: "",
	});

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData);

		setOpen(false);
	};

	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<form className={classes.form} onSubmit={onSubmit}>
					<Typography
						variant='h4'
						style={{ fontWeight: "600", color: "black" }}
					>
						Almost There!
					</Typography>

					<div style={{ width: "100%" }}>
						<TextField
							variant='outlined'
							label='Display Name'
							name='artistName'
							className={classes.textInputs}
							onChange={onChange}
							required
						/>

						<Typography
							variant='subtitle1'
							style={{ marginTop: ".5rem", color: "black" }}
						>
							{" "}
							This name will be visible to everyone
						</Typography>
					</div>
					<TextField
						variant='outlined'
						label='Website'
						name='website'
						onChange={onChange}
						className={classes.textInputs}
					/>
					<TextField
						variant='outlined'
						label='Bio '
						name='bio'
						onChange={onChange}
						className={classes.textInputs}
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						size='large'
					>
						Get Started
					</Button>
				</form>
			</Backdrop>
		</div>
	);
};

BackDrop.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(BackDrop);
