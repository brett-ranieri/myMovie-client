import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({
	movie,
	clearSearch,
	isFavorite,
	favoriteMovies,
}) => {
	const clearMovies = async () => {
		clearSearch();
	};

	const clicked = async () => {
		isFavorite(movie);
		if (buttonFav === "buttonOne") {
			//toggles state based on current state
			setButtonFav("buttonTwo");
		} else {
			setButtonFav("buttonOne");
		}
	};

	console.log("Fav movies from card: ", favoriteMovies);

	const [buttonFav, setButtonFav] = useState("buttonOne");

	useEffect(() => {
		//checks if favMovie, then sets class accordingly
		if (favoriteMovies.includes(movie)) {
			setButtonFav("buttonTwo");
		} else {
			setButtonFav("buttonOne");
		}
		console.log("UseEffect:", favoriteMovies);
	}, [favoriteMovies]);

	return (
		<Card className='h-100'>
			<Card.Img
				variant='top'
				src={movie.imagePath}
			/>
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.genreName}</Card.Text>
				<Button
					className={buttonFav}
					onClick={clicked}
				>
					Favorite
				</Button>
				<Link to={`/movies/${encodeURIComponent(movie._id)}`}>
					<Button
						variant='primary'
						onClick={clearMovies}
					>
						Details
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		imagePath: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		directorName: PropTypes.string.isRequired,
		directorBio: PropTypes.string.isRequired,
		directorBirth: PropTypes.string.isRequired,
		directorDeath: PropTypes.string,
		genreName: PropTypes.string.isRequired,
		genreDescription: PropTypes.string.isRequired,
	}).isRequired,
};
