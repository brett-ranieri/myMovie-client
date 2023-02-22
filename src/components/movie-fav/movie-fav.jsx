import React from "react";
import { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovie = ({ favoriteMovies, isFavorite, clearSearch }) => {
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
						<MovieCard
							movie={movie}
							isFavorite={isFavorite}
							clearSearch={clearSearch}
							favoriteMovies={favoriteMovies}
						/>
					</Col>
				))}
			</>
		</Col>
	);
};
