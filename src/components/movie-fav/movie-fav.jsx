import React from "react";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovie = ({ favoriteMovies, isFavorite, clearSearch }) => {
	return (
		<>
			<h3 className='lightText'>Favorite Movies:</h3>
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
