import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { deletePost } from "../../../actions/post";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;

const DeleteMenu = ({ id, deletePost }) => {
	let history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const deleteItem = () => {
		setAnchorEl(null);
		deletePost(id);
		history.push("/dashboard");
	};

	return (
		<div>
			<IconButton
				aria-label='more'
				aria-controls='long-menu'
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id='long-menu'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				<MenuItem onClick={deleteItem}>Delete</MenuItem>
			</Menu>
		</div>
	);
};

DeleteMenu.propTypes = {
	id: PropTypes.string,
	deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(DeleteMenu);
