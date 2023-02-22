import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, isFavorite, clearSearch }) => {
	const { movieId } = useParams();
	const movie = movies.find((m) => m._id === movieId);
	const storedToken = localStorage.getItem("token");
	const [token] = useState(storedToken ? storedToken : null);

	const [simMoviesExist, setSimMoviesExist] = useState(false);

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};
	window.onbeforeunload();

	const clicked = async () => {
		isFavorite(movie);
	};

	const filterByGenre = (genre, id) => {
		filterMovies = movies.filter((m) => m.genreName === genre && m._id !== id);
		return filterMovies;
	};

	let filteredMovies = filterByGenre(movie.genreName, movie._id);
	console.log(filteredMovies);

	const checkSimMovies = (list) => {
		useEffect(() => {
			if (Object.keys(list).length === 0) {
				setSimMoviesExist(true);
			}
		}, [list]);
	};
	checkSimMovies(filteredMovies);
	console.log(simMoviesExist);

	return (
		<Col className='mt-3 mb-3'>
			<Button
				variant='danger'
				className='mb-5'
				onClick={clicked}
			>
				Favorite
			</Button>
			<div>
				<img
					className='w-100'
					mt={3}
					src={movie.imagePath}
					alt='movie poster'
				/>
			</div>
			<br />
			<div className='text-center'>
				<h1>{movie.title}</h1>
			</div>
			<br />
			<div>
				<h5>Synopsis: </h5>
				<span>{movie.description}</span>
			</div>
			<br />
			<div>
				<h5>Director: </h5>
				<span>{movie.directorName}</span>
			</div>
			<br />
			<div>
				<h5>Director Bio: </h5>
				<span>{movie.directorBio}</span>
			</div>
			<br />
			<div>
				<h5>Director Birth Year: </h5>
				<span>{movie.directorBirth}</span>
			</div>
			<br />
			<div>
				<h5>Director Death Year: </h5>
				<span>{movie.directorDeath}</span>
			</div>
			<br />
			<div>
				<h5>Genre: </h5>
				<span>{movie.genreName}</span>
			</div>
			<br />
			<div>
				<h5>Genre Description: </h5>
				<span>{movie.genreDescription}</span>
			</div>
			<br />
			<>
				<h3>Similar Movies:</h3>
				{simMoviesExist ? (
					<p>There are no movies that match this Genre in the database.</p>
				) : null}
				{filteredMovies.map((movie) => (
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
						/>
					</Col>
				))}
			</>
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
