import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://movie-api-git-main-brett-ranieri.vercel.app/movies")
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
                        genreDescription: doc.Genre.Description
                    };
                });

                setMovies(moviesFromApi);
            });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null); //set useState to null so view not displayed by default

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