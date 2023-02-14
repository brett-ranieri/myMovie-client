import React from "react";
import { Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteMovie } from "../movie-fav/movie-fav";

export const UserView = ({ user, users, movies }) => {
	const thisUser = users.find((u) => u.username === user.Username);
	console.log("User: ", thisUser);
	return (
		<Col className='mt-3'>
			<div>
				<Link to={"/users/profile/update"}>
					<Button
						variant='primary'
						className='m-2 mb-3'
					>
						Update Information
					</Button>
				</Link>
				<Link to={"/users/remove"}>
					<Button
						variant='danger'
						className='m-2 mb-3'
					>
						Delete Account
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
			<Container>
				<FavoriteMovie
					thisUser={thisUser}
					movies={movies}
				/>
			</Container>
		</Col> //button calls onBackClick function from main-view when clicked
	);
};
