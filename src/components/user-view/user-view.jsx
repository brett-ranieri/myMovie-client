import React from "react";
import { useEffect, useState } from "react";
import { Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteMovie } from "../movie-fav/movie-fav";

export const UserView = ({ favoriteMovies, isFavorite, clearSearch }) => {
	const storedUsername = localStorage.getItem("username");
	const storedToken = localStorage.getItem("token");
	const storedUser = localStorage.getItem("user");
	const [user, setUser] = useState(storedUser ? storedUser : null);

	useEffect(() => {
		if (!storedToken) {
			return;
		}

		const getUser = (storedUsername) => {
			fetch(
				`https://movie-api-git-main-brett-ranieri.vercel.app/users/${storedUsername}`,
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				}
			)
				.then((response) => response.json()) //return data as json object
				.then((data) => {
					setUser({ ...data }); //populate movies
				});
		};
		getUser(storedUsername);
	}, [storedToken, storedUsername]);

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
				<span>{user.Name}</span>
			</div>
			<br />
			<div>
				<h5>Username: </h5>
				<span>{user.Username}</span>
			</div>
			<br />
			<div>
				<h5>Email: </h5>
				<span>{user.Email}</span>
			</div>
			<br />
			<div>
				<h5>Birthday: </h5>
				<span>{user.Birthday}</span>
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
					favoriteMovies={favoriteMovies}
					isFavorite={isFavorite}
					clearSearch={clearSearch}
				/>
			</Container>
		</Col> //button calls onBackClick function from main-view when clicked
	);
};
