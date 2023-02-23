import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({
	movies,
	isFavorite,
	clearSearch,
	favoriteMovies,
	// getButtonFav,
	// buttonFavStatus,
}) => {
	const { movieId } = useParams();
	const movie = movies.find((m) => m._id === movieId);
	const storedToken = localStorage.getItem("token");
	const [token] = useState(storedToken ? storedToken : null);

	const [simMoviesExist, setSimMoviesExist] = useState(false);

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};
	window.onbeforeunload();
	/////////////// START - for favorite movies //////////////////////////
	const [buttonFav, setButtonFav] = useState("buttonOne");

	const clicked = async () => {
		isFavorite(movie);
		if (buttonFav === "buttonOne") {
			//toggles state based on current state
			setButtonFav("buttonTwo");
			// getButtonFav("buttonTwo");
		} else {
			setButtonFav("buttonOne");
			// getButtonFav("buttonOne");
		}
	};

	// console.log("Fav movies from card: ", favoriteMovies);
	let favButton;
	useEffect(() => {
		//checks if favMovie, then sets class accordingly
		if (favoriteMovies.includes(movie)) {
			setButtonFav("buttonTwo");
			favButton = true; // getButtonFav(movie, "buttonTwo");
		} else {
			setButtonFav("buttonOne");
			favButton = false; // getButtonFav(movie, "buttonOne");
		}
		// console.log("UseEffect:", favoriteMovies);
	}, [favoriteMovies]);
	//////////////////////End - for favorite movies /////////////////////
	////////////////// Start - Similar Movies Feature //////////////////////////
	const filterByGenre = (genre, id) => {
		filterMovies = movies.filter((m) => m.genreName === genre && m._id !== id);
		return filterMovies;
	};

	let filteredMovies = filterByGenre(movie.genreName, movie._id);
	// console.log(filteredMovies);

	const checkSimMovies = (list) => {
		useEffect(() => {
			if (Object.keys(list).length === 0) {
				setSimMoviesExist(true);
			}
		}, [list]);
	};
	checkSimMovies(filteredMovies);

	// console.log(buttonFavStatus);
	// console.log(simMoviesExist);
	/////////////////////// End - Similar Movies Feature //////////////////////
	// let buttonFav;
	// const getButtonFav = (data) => {
	// 	console.log(data);
	// 	buttonFav = data;
	// 	// bFav = data;
	// };
	// useEffect(() => {
	// 	getButtonFav();
	// }, []);

	return (
		<Col className='mt-3 mb-3'>
			<Button
				className={buttonFav}
				onClick={clicked}
			>
				{favButton ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						class='bi bi-balloon-heart-fill'
						viewBox='0 0 16 16'
					>
						<path
							fill-rule='evenodd'
							d='M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z'
						/>
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						class='bi bi-balloon-heart'
						viewBox='0 0 16 16'
					>
						<path
							fill-rule='evenodd'
							d='m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z'
						/>
					</svg>
				)}
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
							favoriteMovies={favoriteMovies}
							favButton={favoriteMovies.includes(movie)}
							// getButtonFav={getButtonFav}
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
