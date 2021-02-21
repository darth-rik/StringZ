import React, { Fragment } from "react";
import { Typography, Avatar, Divider } from "@material-ui/core";
import img from "../../images/avatar.png";

const AutoComplete = () => {
	return (
		<Fragment>
			<div style={{ display: "flex", padding: "1rem", alignItems: "center" }}>
				<Avatar style={{ marginRight: "1rem" }} src={img} alt='' />
				<Typography variant='body1' color='textPrimary'>
					Anticlock Minds
				</Typography>
			</div>
			<Divider light />
		</Fragment>
	);
};

export default AutoComplete;
