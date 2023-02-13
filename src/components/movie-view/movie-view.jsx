import { useState } from "react";
import { useParams } from "react-router";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user }) => {
	const { movieId } = useParams();
	const movie = movies.find((m) => m._id === movieId);
	const storedToken = localStorage.getItem("token");
	const [token] = useState(storedToken ? storedToken : null);
	console.log(movieId);
	console.log(user);

	const addFavMovie = async (event) => {
		event.preventDefault();

		await fetch(
			`https://movie-api-git-main-brett-ranieri.vercel.app/users/${user.Username}/movies/${movieId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then(() => {
				alert("Movie successfully added to your favorites!");
				location.reload();
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send("Error: ", error);
			});
	};

	const removeFavMovie = async (event) => {
		event.preventDefault();

		await fetch(
			`https://movie-api-git-main-brett-ranieri.vercel.app/users/${user.Username}/remove/${movieId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then(() => {
				alert("Movie successfully removed from your favorites.");
				location.reload();
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send("Error: ", error);
			});
	};

	return (
		<Col className='mt-5'>
			<Button
				variant='secondary'
				className='m-2'
				onClick={(event) => addFavMovie(event)}
			>
				Add to Favorites
			</Button>
			<Button
				variant='warning'
				className='m-2'
				onClick={(event) => removeFavMovie(event)}
			>
				Remove from Favorites
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
