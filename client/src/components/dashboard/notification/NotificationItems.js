import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import img from "../../../images/avatar.png";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	sectionDesktop: {
		gridRow: "2",
		gridColumn: "2",
		[theme.breakpoints.up("md")]: {
			gridRow: "1",
			gridColumn: "3",
		},
	},
}));

const NotificationItems = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<MenuItem
				style={{
					padding: "1rem 2rem",
					backgroundColor: "",
					display: "grid",
					gridTemplateColumns: "repeat(3,1fr)",
					gap: "1rem",
					justifyItems: "center",
				}}
				// onClick={handleMenuClose}
			>
				<img
					style={{
						height: "3rem",
						width: "3rem",
						borderRadius: "50rem",
						// marginRight: "3rem",
					}}
					src={img}
					alt=''
				/>
				<Typography style={{ marginRight: "" }}>
					Luigi's Pizza liked your post
				</Typography>
				<Typography variant='caption' className={classes.sectionDesktop}>
					4days ago
				</Typography>
			</MenuItem>
			<Divider />
		</Fragment>
	);
};

export default NotificationItems;
