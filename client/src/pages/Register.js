import React, { useState } from "react";
import { connect } from "react-redux";
import Alerts from "../components/layouts/Alerts";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import { Fragment } from "react";

//Material UI
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const Register = ({ setAlert, register, isAuthenticated }) => {
	const classes = useStyles();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		password2: "",
	});

	const { email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Passwords do not match", "error");
		} else {
			register({
				email,
				password,
			});
		}
	};

	//Redirect on register success

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Fragment>
			<Alerts />
			<form onSubmit={onSubmit} className={classes.root}>
				<img
					src='./images/Logo.svg'
					style={{ height: "3rem", width: "3rem" }}
					alt=''
				/>
				<Typography variant='h5' style={{ fontWeight: "bolder" }}>
					Register
				</Typography>

				<TextField
					variant='outlined'
					label='email'
					name='email'
					type='email'
					onChange={(e) => onChange(e)}
					value={email}
					className={classes.textInputs}
				/>
				<TextField
					variant='outlined'
					label='password'
					name='password'
					type='password'
					onChange={(e) => onChange(e)}
					value={password}
					className={classes.textInputs}
				/>
				<TextField
					variant='outlined'
					label='confirm password'
					name='password2'
					type='password'
					onChange={(e) => onChange(e)}
					value={password2}
					className={classes.textInputs}
				/>

				<Button variant='contained' color='primary' size='large' type='submit'>
					Register
				</Button>

				<Typography variant='subtitle2'>
					Have an account? Click{" "}
					<Link to='/login'>
						{" "}
						<strong>
							<u>here</u>
						</strong>{" "}
					</Link>{" "}
					to Login
				</Typography>
				<Typography variant='subtitle2'>
					Back to
					<Link to='/'>
						{" "}
						<strong>
							<u>Home</u>
						</strong>{" "}
					</Link>
				</Typography>
			</form>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
