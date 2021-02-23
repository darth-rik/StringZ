import React from "react";
import Navbar from "../components/dashboard/Navbar";
import PostInput from "../components/PostInput";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import PostItem from "../components/dashboard/post body/PostItem";

const Dashboard = () => {
	return (
		<div>
			<Navbar />
			<Container style={{ margin: "1rem auto" }} maxWidth='lg'>
				<PostItem />
				<PostItem />
				<PostItem />
			</Container>
		</div>
	);
};

export default Dashboard;
