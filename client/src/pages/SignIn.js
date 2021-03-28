import React, { useState } from "react";
import { login } from "../actions/auth";
import { Fragment } from "react";
import Alerts from "../components/layouts/Alerts";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

const SignIn = ({ login, isAuthenticated }, props) => {
	const classes = useStyles();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

	const onSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	//Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
		// props.history.push("/dashboard");
	}

	return (
		<Fragment>
			<Alerts />
			<form className={classes.root} onSubmit={onSubmit}>
				<img
					src='./images/Logo.svg'
					style={{ height: "3rem", width: "3rem" }}
					alt=''
				/>
				<Typography variant='h5' style={{ fontWeight: "bolder" }}>
					Log in to StringZ
				</Typography>
				<TextField
					variant='outlined'
					label='email'
					name='email'
					type='email'
					onChange={(e) => onChange(e)}
					className={classes.textInputs}
				/>
				<TextField
					variant='outlined'
					label='password'
					name='password'
					type='password'
					onChange={(e) => onChange(e)}
					className={classes.textInputs}
				/>
				<Button type='submit' variant='contained' color='primary' size='large'>
					Log In
				</Button>{" "}
				<Typography variant='subtitle2'>
					Do not have an account? Click{" "}
					<Link to='/register'>
						{" "}
						<strong>
							<u>here</u>
						</strong>{" "}
					</Link>{" "}
					to Register
				</Typography>
				<Typography variant='subtitle2'>
					Back to{" "}
					<Link to='/'>
						<strong>
							<u>Home</u>
						</strong>
					</Link>
				</Typography>
			</form>
		</Fragment>
	);
};

SignIn.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
