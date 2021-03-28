import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addPost } from "../actions/post";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",

		"& .MuiTextField-root": {
			width: "100%",
		},
	},

	input: {
		height: "10rem",
		fontSize: ".9rem",
		overflow: "hidden",
	},
	[theme.breakpoints.up("md")]: {
		input: {
			height: "10rem",
			fontSize: "1rem",
		},
	},
}));

const PostInput = ({ addPost, closePost }) => {
	const classes = useStyles();
	const history = useHistory();
	const [text, setText] = React.useState("");

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		addPost({ text });
		setText("");
		closePost();
		history.push("/dashboard");
	};

	return (
		<Fragment>
			<form
				className={classes.root}
				onSubmit={onSubmit}
				noValidate
				autoComplete='off'
			>
				<div style={{ padding: "1rem" }}>
					<TextField
						label='Write Something..'
						rows='8'
						multiline
						value={text}
						onChange={handleChange}
						variant='outlined'
						InputProps={{
							className: classes.input,
						}}
					/>
				</div>
				<Button
					style={{ alignSelf: "center", marginBottom: "1rem" }}
					variant='contained'
					color='primary'
					type='submit'
				>
					Post
				</Button>
			</form>
		</Fragment>
	);
};

PostInput.propTypes = {
	addPost: PropTypes.func.isRequired,
	closePost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostInput);
