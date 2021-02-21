import React from "react";
import Typography from "@material-ui/core/Typography";
import NotificationItems from "./NotificationItems";

const Notification = () => {
	return (
		<div style={{ width: "100%", maxHeight: "70vh", overflowY: "scroll" }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",

					justifyItems: "center",
					alignItems: "center",
					color: "blue",
					padding: "1rem 2rem ",
				}}
			>
				<Typography
					style={{ fontSize: "1rem", marginRight: "2rem" }}
					variant='overline'
				>
					Notifications
				</Typography>
				<Typography>Mark all as read</Typography>
			</div>
			<NotificationItems />
		</div>
	);
};

export default Notification;
