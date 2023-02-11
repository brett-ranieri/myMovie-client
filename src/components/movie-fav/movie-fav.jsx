import React from "react";
import { useState } from "react";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovie = ({ thisUser, movies }) => {
	const storedToken = localStorage.getItem("token");
	const [token] = useState(storedToken ? storedToken : null);

	let favoriteMovies = movies.filter((m) =>
		thisUser.favoriteMovies.includes(m._id)
	);

	console.log("Fav Movies: ", favoriteMovies);

	return (
		<Col>
			<>
				{favoriteMovies.map((movie) => (
					<Col
						className='mb-3 mt-3'
						key={movie._id}
						sm={6}
						md={4}
						lg={3}
					>
						<MovieCard movie={movie} />
					</Col>
				))}
			</>
		</Col>
	);
};
