import React from "react";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UserView = ({ user, users }) => {
	const thisUser = users.find((u) => u.username === user.Username);

	return (
		<Col className='mt-5'>
			<div>
				<Link to={"/users/profile/update"}>
					<Button
						variant='primary'
						className='mb-5'
					>
						Update Information
					</Button>
				</Link>
				<h5>Name: </h5>
				<span>{thisUser.name}</span>
			</div>
			<div>
				<h5>Username: </h5>
				<span>{thisUser.username}</span>
			</div>
			<br />
			<div>
				<h5>Password: </h5>
				<span>{thisUser.password}</span>
			</div>
			<br />
			<div>
				<h5>Email: </h5>
				<span>{thisUser.email}</span>
			</div>
			<br />
			<div>
				<h5>Birthday: </h5>
				<span>{thisUser.birthday}</span>
			</div>
			<br />
			<Link to={"/"}>
				<Button
					variant='primary'
					className='mb-5'
				>
					Back
				</Button>
			</Link>
		</Col> //button calls onBackClick function from main-view when clicked
	);
};
