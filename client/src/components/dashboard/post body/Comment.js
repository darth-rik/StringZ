import React from "react";
import { Container, Avatar, Divider, Typography } from "@material-ui/core";

const Comment = () => {
	return (
		<Container>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "1.5rem",
				}}
			>
				<Avatar style={{ width: "3rem", height: "3rem" }} />
				<div>
					<p>AntiClock Minds</p>
					<p style={{ marginTop: "-.5rem", fontWeight: "lighter" }}>
						2 hours ago
					</p>
				</div>
			</div>
			<Typography
				style={{
					width: "90%",
					margin: "auto",
					marginBottom: "1rem",
					lineHeight: "1.5rem",
					marginTop: "1rem",
				}}
				variant='body2'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, sapiente,
				odio totam minima, cum nobis maxime voluptate placeat a odit eaque?
				Lorem,
			</Typography>

			<Divider />
		</Container>
	);
};

export default Comment;
