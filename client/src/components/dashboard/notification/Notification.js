import React from "react";
import Typography from "@material-ui/core/Typography";
import NotificationItems from "./NotificationItems";
import { Divider } from "@material-ui/core";

const Notification = ({ profiles: { notification }, close }) => {
	const closeNotif = () => {
		close();
	};

	return (
		<div className={styles.notificationBody}>
			<div
				style={{
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
			</div>
			<Divider />
			<div>
				{notification.length > 0 ? (
					notification.map((not) => (
						<NotificationItems
							close={closeNotif}
							key={not._id}
							notification={not}
						/>
					))
				) : (
					<Typography
						variant='subtitle1'
						style={{ padding: "1rem 2rem", textAlign: "center" }}
					>
						No new notification
					</Typography>
				)}
			</div>
		</div>
	);
};

const styles = {
	notificationBody: {
		width: "100%",
		maxHeight: "50vh",
		overflowY: "scroll",
	},
};

export default Notification;
