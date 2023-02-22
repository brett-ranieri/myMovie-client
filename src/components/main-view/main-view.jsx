import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserView } from "../user-view/user-view";
import { UpdateView } from "../user-update/user-update";
import { RemoveUser } from "../user-remove/user-remove";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
	const storedUsername = localStorage.getItem("username");
	const storedToken = localStorage.getItem("token");
	const storedUser = localStorage.getItem("user");
	const [movies, setMovies] = useState([]);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [username, setUsername] = useState(
		storedUsername ? storedUsername : null
	);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch("https://movie-api-git-main-brett-ranieri.vercel.app/movies", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json()) //return data as json object
			.then((data) => {
				const moviesFromApi = data.map((doc) => {
					//parse data
					return {
						_id: doc._id,
						title: doc.Title,
						imagePath: doc.ImagePath,
						description: doc.Description,
						directorName: doc.Director.Name,
						directorBio: doc.Director.Bio,
						directorBirth: doc.Director.Birth,
						directorDeath: doc.Director.Death,
						genreName: doc.Genre.Name,
						genreDescription: doc.Genre.Description,
					};
				});

				setMovies(moviesFromApi); //populate movies
			});
	}, [token]);

	useEffect(() => {
		if (!token) {
			return;
		}

		const getUser = (username) => {
			fetch(
				`https://movie-api-git-main-brett-ranieri.vercel.app/users/${username}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
				.then((response) => response.json()) //return data as json object
				.then((data) => {
					setUser({ ...data }); //populate movies
				});
		};
		getUser(username);
	}, [token, username]);

	// useEffect(() => {
	// 	console.log("Main User: ", user);
	// 	console.log("Favorite Movies: ", favoriteMovies);
	// 	// console.log("Stored Username: ", storedUsername);
	// 	// console.log(storedToken);
	// });
	///////////////////////// Start of Movie Favorites ///////////////////////////////////////

	useEffect(() => {
		if (!user) {
			return;
		}

		const favList = movies.filter((movie) =>
			user.FavoriteMovies.includes(movie._id)
		);
		setFavoriteMovies(favList);
	}, [movies, user]); //initially loads favList from API, populates with full object so includes array method will work later (unable to use includes on just _id)

	const isFavorite = async (movie) => {
		console.log("in func: ", favoriteMovies);
		console.log(movie);
		if (favoriteMovies.includes(movie)) {
			console.log("already a fav");
			removeFavMovie(movie._id);
			setFavoriteMovies(favoriteMovies.filter((m) => m._id !== movie._id));
		} else {
			console.log("not a fav");
			addFavMovie(movie._id);
			setFavoriteMovies([...favoriteMovies, movie]); //...is spread operator, allows a quick copy of an existing array or object
		}
	};

	const addFavMovie = async (movieId) => {
		await fetch(
			`https://movie-api-git-main-brett-ranieri.vercel.app/users/${user.Username}/movies/${movieId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).catch((error) => {
			console.error(error);
			res.status(500).send("Error: ", error);
		});
	};

	const removeFavMovie = async (movieId) => {
		await fetch(
			`https://movie-api-git-main-brett-ranieri.vercel.app/users/${user.Username}/remove/${movieId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).catch((error) => {
			console.error(error);
			res.status(500).send("Error: ", error);
		});
	};
	////////////////////////////// End of Movie Favorites //////////////////////////////////////
	/////////////////////////////// Start Search Feature /////////////////////////////////////

	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		setFilteredMovies(movies);
	}, [movies]);

	const searchResult = async (text) => {
		let searchFilter = movies.filter((m) =>
			m.title.toLowerCase().includes(text)
		);
		setFilteredMovies(searchFilter);
	};

	const clearSearch = async () => {
		setSearchText("");
		searchResult("");
	};

	const handleSearch = async () => {
		let handledText = searchText.toLowerCase();
		console.log(handledText);
		searchResult(handledText);
	};

	const handleKeyDown = async (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSearch();
		}
	};

	// const Input = () => {
	// 	const handleKeyDown = (event) => {
	// 		if (event.key === "enter") {
	// 			console.log("pressed it");
	// 		}
	// 	};
	// 	return <input onKeyDown={handleKeyDown} />;
	// };

	return (
		<BrowserRouter>
			<NavigationBar
				user={user}
				onLoggedOut={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
				clearSearch={clearSearch}
			/>
			<Row className='justify-content-md-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/login'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<LoginView
											onLoggedIn={(username, token) => {
												setUsername(username);
												setToken(token);
											}}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/movies/:movieId'
						element={
							<>
								{!user ? (
									<Navigate
										to='/login'
										replace
									/>
								) : movies.length === 0 ? (
									<div>The list is empty!</div>
								) : (
									<Col md={8}>
										<MovieView
											movies={movies}
											user={user}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								{!user ? (
									<Navigate
										to='/login'
										replace
									/>
								) : movies.length === 0 ? (
									<div>The list is empty!</div>
								) : filteredMovies.length === 0 ? (
									<>
										<Row>
											<Col
												md={8}
												className='mt-4'
											>
												<Form className='d-flex align-items-end'>
													<Form.Control
														onChange={(e) => setSearchText(e.target.value)}
														value={searchText}
														type='search'
														placeholder='Search Movies'
														className='me-2'
														aria-label='Search'
														onKeyDown={handleKeyDown}
													/>
													<Button
														variant='primary'
														onClick={handleSearch}
														as={Link}
														to='/'
														className='me-2'
														type='submit'
													>
														Search
													</Button>
													<Button
														variant='danger'
														onClick={clearSearch}
														className='me-2'
													>
														Clear
													</Button>
												</Form>
											</Col>
										</Row>
										<h5>Nothing matched your search. Please try again</h5>
									</>
								) : (
									<>
										<Row>
											<Col
												md={8}
												className='mt-4'
											>
												<Form className='d-flex align-items-end'>
													<Form.Control
														onChange={(e) => setSearchText(e.target.value)}
														value={searchText}
														type='search'
														placeholder='Search Movies'
														className='me-2'
														aria-label='Search'
														onKeyDown={handleKeyDown}
													/>
													<Button
														variant='primary'
														onClick={handleSearch}
														as={Link}
														to='/'
														className='me-2'
														type='submit'
													>
														Search
													</Button>
													<Button
														variant='danger'
														onClick={clearSearch}
														className='me-2'
													>
														Clear
													</Button>
												</Form>
											</Col>
										</Row>

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
													clearSearch={clearSearch}
													isFavorite={isFavorite}
												/>
											</Col>
										))}
									</>
								)}
							</>
						}
					/>
					<Route
						path='/users/profile'
						element={
							<>
								{!user ? (
									<Navigate
										to='/login'
										replace
									/>
								) : (
									<Col md={8}>
										<UserView favoriteMovies={favoriteMovies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/users/profile/update/'
						element={
							<>
								{!user ? (
									<Navigate
										to='/login'
										replace
									/>
								) : (
									<Col md={8}>
										<UpdateView
											user={user}
											onLoggedOut={() => {
												setUser(null);
												setToken(null);
												localStorage.clear();
											}}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/users/remove'
						element={
							<>
								{!user ? (
									<Navigate
										to='/login'
										replace
									/>
								) : (
									<Col md={8}>
										<RemoveUser
											user={user}
											onLoggedOut={() => {
												setUser(null);
												setToken(null);
												localStorage.clear();
											}}
										/>
									</Col>
								)}
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
