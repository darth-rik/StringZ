import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "80%",
		margin: "auto",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const Alerts = ({ alerts }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{alerts !== null &&
				alerts.length > 0 &&
				alerts.map((alert) => (
					<Alert key={alert.id} severity={alert.alertType}>
						{alert.msg}
					</Alert>
				))}
		</div>
	);
};

Alerts.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
