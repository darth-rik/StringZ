import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

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

const PostInput = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<Fragment>
			<form className={classes.root} noValidate autoComplete='off'>
				<div style={{ padding: "1rem", height: "" }}>
					<TextField
						id='outlined-multiline-flexible'
						label='Write Something..'
						multiline
						rowsMax={5}
						value={value}
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
				>
					Post
				</Button>
			</form>
		</Fragment>
	);
};

export default PostInput;
