import { useParams } from "react-router";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();
	const movie = movies.find((m) => m._id === movieId);
	console.log(movieId);
	return (
		<Col className='mt-5'>
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
