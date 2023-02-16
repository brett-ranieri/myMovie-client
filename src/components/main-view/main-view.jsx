import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserView } from "../user-view/user-view";
import { UpdateView } from "../user-update/user-update";
import { RemoveUser } from "../user-remove/user-remove";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user")); //parse stringified JSON object sent byt login-view
	const storedToken = localStorage.getItem("token");
	const [movies, setMovies] = useState([]);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(storedUser ? storedUser : null); //set useState to first take storedUser info, if not, state is set to null
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [filteredMovies, setFilteredMovies] = useState([]);

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

		fetch("https://movie-api-git-main-brett-ranieri.vercel.app/users", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json()) //return data as json object
			.then((data) => {
				const usersFromApi = data.map((doc) => {
					//parse data
					return {
						user_id: doc._id,
						name: doc.Name,
						username: doc.Username,
						password: doc.Password,
						email: doc.Email,
						birthday: doc.Birthday,
						favoriteMovies: doc.FavoriteMovies,
					};
				});

				setUsers(usersFromApi); //populate movies
			});
	}, [token]);

	/////////////////////// Start of Movie Filtering ///////////////////////////////////
	useEffect(() => {
		setFilteredMovies(movies);
		console.log("Initial Movies: ", filteredMovies);
	}, [movies]);

	const searchResult = async (text) => {
		console.log("searched for: ", text);
		let searchFilter = movies.filter((m) =>
			m.title.toLowerCase().includes(text)
		);
		console.log("filtered results: ", searchFilter);
		setFilteredMovies(searchFilter);
	};

	const clearSearch = async () => {
		console.log("second step");
		searchResult("");
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
				onSearch={searchResult}
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
											onLoggedIn={(user, token) => {
												setUser(user);
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
								) : filteredMovies.length === 0 ? (
									<div>Nothing matched your search. Please try again</div>
								) : (
									<>
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
										<UserView
											user={user}
											users={users}
											movies={movies}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/users/profile/update'
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
