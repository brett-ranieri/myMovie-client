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
				.then((response) => response.json())
				.then((data) => {
					setUser({ ...data });
				});
		};
		getUser(storedUsername);
	}, [storedToken, storedUsername]);

	return (
		<Col className='mt-3'>
			<Link to={"/users/profile/update"}>
				<Button className='m-2 mb-3 goldButton'>Update Information</Button>
			</Link>
			<Link to={"/users/remove"}>
				<Button className='m-2 mb-3 silverButton'>Delete Account</Button>
			</Link>
			<div class='accountContainer textContainer rounded-4 shadow-lg'>
				<h3>Account Information:</h3>
				<h5>Name: </h5>
				<p class='accountInfo'>{user.Name}</p>
				<h5>Username: </h5>
				<p class='accountInfo'>{user.Username}</p>
				<h5>Email: </h5>
				<p class='accountInfo'>{user.Email}</p>
				<h5>Birthday: </h5>
				<p class='accountInfo'>
					{new Date(user.Birthday).toLocaleDateString("en-US")}
				</p>
			</div>
			<Container>
				<br />
				<FavoriteMovie
					favoriteMovies={favoriteMovies}
					isFavorite={isFavorite}
					clearSearch={clearSearch}
				/>
			</Container>
			<Link to={"/"}>
				<Button className='mb-5 goldButton'>Back</Button>
			</Link>
		</Col>
	);
};
