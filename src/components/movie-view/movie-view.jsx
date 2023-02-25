import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({
	movies,
	isFavorite,
	clearSearch,
	favoriteMovies,
}) => {
	const { movieId } = useParams();
	const movie = movies.find((m) => m._id === movieId);

	const [simMoviesExist, setSimMoviesExist] = useState(false);
	const [favButton, setFavButton] = useState(false);
	const [buttonStyle, setButtonStyle] = useState("buttonOne");

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};
	window.onbeforeunload();

	const clicked = async () => {
		isFavorite(movie);
		if (buttonStyle === "buttonOne") {
			setButtonStyle("buttonTwo");
		} else {
			setButtonStyle("buttonOne");
		}
	};

	useEffect(() => {
		if (favoriteMovies.includes(movie)) {
			setButtonStyle("buttonTwo");
			setFavButton(true);
		} else {
			setButtonStyle("buttonOne");
			setFavButton(false);
		}
	}, [favoriteMovies]);

	let filterMovies;
	const filterByGenre = (genre, id) => {
		filterMovies = movies.filter((m) => m.genreName === genre && m._id !== id);
		return filterMovies;
	};

	let filteredMovies = filterByGenre(movie.genreName, movie._id);

	const checkSimMovies = (list) => {
		useEffect(() => {
			if (Object.keys(list).length === 0) {
				setSimMoviesExist(true);
			}
		}, [list]);
	};
	checkSimMovies(filteredMovies);

	return (
		<Col className='mt-3 mb-3'>
			<div className='container'>
				<Button
					className={buttonStyle}
					onClick={clicked}
				>
					{favButton ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='50'
							height='50'
							fill='currentColor'
							class='bi bi-star-fill'
							viewBox='0 0 16 16'
						>
							<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='50'
							height='50'
							fill='currentColor'
							class='bi bi-star'
							viewBox='0 0 16 16'
						>
							<path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
						</svg>
					)}
				</Button>
				<div>
					<img
						className='w-100 rounded-4 shadow-lg'
						mt={3}
						src={movie.imagePath}
						alt='movie poster'
					/>
				</div>
			</div>

			<br />
			<div className='textContainer rounded-4 shadow-lg'>
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
			</div>
			<>
				<br />
				<h3 className='lightText'>Similar Movies:</h3>
				{simMoviesExist ? (
					<p>There are no movies that match this Genre in the database.</p>
				) : null}
				<Row
					style={{ display: "flex", flexDirection: "row" }}
					className='col-md-offset-2'
				>
					{filteredMovies.map((movie) => (
						<Col
							className='mb-3 mt-3'
							key={movie._id}
							sm={4}
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
			<Link to={"/"}>
				<Button className='mb-5 goldButton'>Back</Button>
			</Link>
		</Col>
	);
};
