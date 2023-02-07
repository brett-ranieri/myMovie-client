import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); //parse stringified JSON object sent byt login-view
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); //set useState to null so view not displayed by default
    const [user, setUser] = useState(storedUser? storedUser : null); //set useState to first take storedUser info, if not, state is set to null
    const [token, setToken] = useState(storedToken? storedToken : null);

    useEffect(() => {

        if (!token) {
            return;
        }

        fetch("https://movie-api-git-main-brett-ranieri.vercel.app/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json()) //return data as json object
            .then((data) => { 
                const moviesFromApi = data.map((doc) => { //parse data
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
                        genreDescription: doc.Genre.Description
                    };
                });
                
                setMovies(moviesFromApi); //populate movies
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5} style={{border: "1px solid green"}}>
                    <h3>Login:</h3>
                        <LoginView 
                            onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                            }}
                        />
                    <h3>or Sign up:</h3>
                        <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} style={{border: "1px solid white"}}>
                    <MovieView 
                        movie={selectedMovie} 
                        onBackClick={() => setSelectedMovie(null)} /> {/*onBackClick resets state to null, returning to MainView*/}
                </Col>
            ) : movies.length === 0 ? (
                <Col>
                    The list is empty!
                </Col>
            ) : (
                <>
                <Row className="text-end">
                    <Col>
                        <Button className="mb-3 mt-3" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    </Col>
                </Row>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} sm={6} md={4} lg={3}>
                                <MovieCard 
                                    movie={movie} 
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie); //function to make the clicked movie the selected movie
                                    }}
                                />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
}