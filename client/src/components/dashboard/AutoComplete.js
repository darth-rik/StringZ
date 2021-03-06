import React, { Fragment } from "react";
import { Typography, Avatar, Divider } from "@material-ui/core";
import img from "../../images/avatar.png";
import { Link } from "react-router-dom";

const AutoComplete = ({
	data: {
		user,
		artistName,
		avatar: { avatar },
	},
}) => {
	return (
		<Link to={`/profile/${user}`}>
			<div style={{ display: "flex", padding: "1rem", alignItems: "center" }}>
				<Avatar
					style={{ marginRight: "1rem" }}
					src={`../images/${avatar}`}
					alt=''
				/>
				<Typography variant='body1' color='textPrimary'>
					{artistName}
				</Typography>
			</div>
			<Divider light />
		</Link>
	);
};

export default AutoComplete;
