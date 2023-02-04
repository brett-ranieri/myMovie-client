import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

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

    if (!user) {
        return (
            <div>
                <LoginView 
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
            </div>
        );
    }

    if (selectedMovie) { //if movie selected, return movie view for that movie
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /> //onBackClick resets state to null, returning to MainView
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>
    } else {
        return (
            <div>
                <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie._id} 
                        movie={movie} 
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie); //function to make the clicked movie the selected movie
                        }}
                    />
                ))}
            </div>
        );
    }; 
}