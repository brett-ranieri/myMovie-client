import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovie = ({ favoriteMovies, isFavorite, clearSearch }) => {
	return (
		<>
			<h3>Favorite Movies:</h3>
			<Row
				style={{ display: "flex", flexDirection: "row" }}
				className='col-md-offset-2'
			>
				{favoriteMovies.map((movie) => (
					<Col
						className='mb-3 mt-3'
						key={movie._id}
						sm={6}
						md={4}
						lg={3}
					>
						<MovieCard
							movie={movie}
							isFavorite={isFavorite}
							clearSearch={clearSearch}
							favoriteMovies={favoriteMovies}
							favButton={favoriteMovies.includes(movie)}
						/>
					</Col>
				))}
			</Row>
		</>
	);
};
