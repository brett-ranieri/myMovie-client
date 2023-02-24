import React from "react";
import { useState } from "react";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RemoveUser = ({ user, onLoggedOut }) => {
	const storedToken = localStorage.getItem("token");
	const [token] = useState(storedToken ? storedToken : null);
	console.log("User info: ", user);

	const deleteUser = async (event) => {
		event.preventDefault();

		await fetch(
			`https://movie-api-git-main-brett-ranieri.vercel.app/users/${user.Username}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then(() => {
			alert("Account successfully deleted. Have a good day");
			onLoggedOut();
		});
	};

	return (
		<Col className='mt-3 mb-3'>
			<div className='textContainer rounded-4 shadow-lg'>
				<h3>Are you sure you want to delete your account?</h3>
				<p>
					This is permanant and all information associated with this account
					will never be accesible again.
				</p>
				<p>Click confirm to delete account.</p>
				<Link to={"/"}>
					<Button
						className='m-2 silverButton'
						onClick={(event) => deleteUser(event)}
					>
						Confirm
					</Button>
				</Link>
				<Link to={"/users/profile"}>
					<Button className='m-2 goldButton'>Back</Button>
				</Link>
			</div>
		</Col> //button calls onBackClick function from main-view when clicked
	);
};
