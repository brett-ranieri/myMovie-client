import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
	//need to destructure the movie object, and the onMovieClick function from main-view
	return (
		<Card className='h-100'>
			<Card.Img
				variant='top'
				src={movie.imagePath}
			/>
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.genreName}</Card.Text>
				<Link to={`/movies/${encodeURIComponent(movie._id)}`}>
					<Button variant='primary'>Details</Button>
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
	onMovieClick: PropTypes.func.isRequired,
};
