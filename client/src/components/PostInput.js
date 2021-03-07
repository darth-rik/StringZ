import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { addPost } from "../actions/post";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
		width: "100%",
		display: "flex",
		flexDirection: "column",

		"& .MuiTextField-root": {
			width: "100%",
		},
	},

	input: {
		height: "8rem",
		fontSize: ".9rem",
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
	const [text, setText] = React.useState("");

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		addPost({ text });
		setText("");
		closePost();
	};

	return (
		<Fragment>
			<form
				className={classes.root}
				onSubmit={onSubmit}
				noValidate
				autoComplete='off'
			>
				<div style={{ padding: "1rem", height: "" }}>
					<TextField
						label='Write Something..'
						multiline
						rowsMax={8}
						value={text}
						onChange={handleChange}
						variant='outlined'
						InputProps={{
							className: classes.input,
						}}
					/>
					{/* <textarea name='' id='' cols='30' rows='10'></textarea> */}
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
