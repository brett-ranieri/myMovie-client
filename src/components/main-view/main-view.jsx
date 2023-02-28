import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserView } from "../user-view/user-view";
import { UpdateView } from "../user-update/user-update";
import { RemoveUser } from "../user-remove/user-remove";
import { Row, Col, Button, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
	const storedToken = localStorage.getItem("token");
	const storedUserId = localStorage.getItem("userId");
	const [movies, setMovies] = useState([]);
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);
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
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((doc) => {
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

				setMovies(moviesFromApi);
			});
	}, [token]);

	useEffect(() => {
		if (!token) {
			return;
		}

		const getUsers = () => {
			fetch(`https://movie-api-git-main-brett-ranieri.vercel.app/users`, {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((response) => response.json())
				.then((data) => {
					setUsers(data);
				});
		};
		getUsers();
	}, [token]);

	const getUser = users.find((u) => u._id === storedUserId);

	useEffect(() => {
		if (!token) {
			return;
		}
		setUser(getUser);
	}, [getUser]);

	const rerunUsers = async () => {
		fetch(`https://movie-api-git-main-brett-ranieri.vercel.app/users`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});
	};

	useEffect(() => {
		if (!user) {
			return;
		}

		const favList = movies.filter((movie) =>
			user.FavoriteMovies.includes(movie._id)
		);
		setFavoriteMovies(favList);
	}, [movies, user]);

	const isFavorite = async (movie) => {
		if (favoriteMovies.includes(movie)) {
			removeFavMovie(movie._id);
			setFavoriteMovies(favoriteMovies.filter((m) => m._id !== movie._id));
		} else {
			addFavMovie(movie._id);
			setFavoriteMovies([...favoriteMovies, movie]);
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
		searchResult(handledText);
	};

	const handleKeyDown = async (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSearch();
		}
	};

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
			<Row className='justify-content-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col sm={9}>
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
									<Col sm={9}>
										<LoginView
											onLoggedIn={(token) => {
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
											isFavorite={isFavorite}
											clearSearch={clearSearch}
											favoriteMovies={favoriteMovies}
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
									<div>The list is empty! Please wait for it to load...</div>
								) : filteredMovies.length === 0 ? (
									<>
										<Row className='justify-content-center'>
											<Col
												xs='auto'
												sm={6}
												md={6}
												lg={6}
												className='mt-4'
											>
												<Form>
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
														onClick={handleSearch}
														as={Link}
														to='/'
														className='mt-2 me-2 goldButton'
														type='submit'
													>
														Search
													</Button>
													<Button
														onClick={clearSearch}
														className='mt-2 me-2 silverButton'
													>
														Clear
													</Button>
												</Form>
											</Col>
										</Row>
										<h5 className='mt-4'>
											Nothing matched your search. Please try again
										</h5>
									</>
								) : (
									<>
										<Row className='justify-content-center'>
											<Col
												xs='auto'
												sm={6}
												md={6}
												lg={6}
												className='mt-4'
											>
												<Form>
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
														className='mt-2 me-2 goldButton'
														type='submit'
													>
														Search
													</Button>
													<Button
														onClick={clearSearch}
														className='mt-2 me-2 silverButton'
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
													isFavorite={isFavorite}
													favButton={favoriteMovies.includes(movie)}
												/>
											</Col>
										))}
									</>
								)}
							</>
						}
					/>
					<Route
						path='/users/:_id'
						element={
							<>
								{!user ? (
									<Navigate
										to='/login'
										replace
									/>
								) : (
									<Col md={8}>
										<UserView
											user={user}
											setUser={setUser}
											favoriteMovies={favoriteMovies}
											isFavorite={isFavorite}
											clearSearch={clearSearch}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/users/:_id/update/'
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
											rerunUsers={rerunUsers}
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
