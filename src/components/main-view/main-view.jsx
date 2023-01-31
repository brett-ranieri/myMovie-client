import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            _id: "63c6d4d524c7a5871a1aa904",
            Title: "Home Alone", 
            Description: "The McCallister family is preparing to spend Christmas in Paris, gathe…",
            GenreName: "Comedy",
            GenreDescription: "Comedy is a genre of film in which the main emphasis is on humor.",
            DirectorName: "Chris Columbus",
            DirectorBio: "Columbus studied film at Tisch School of the Arts where he developed a…",
            DirectorBirth: "1958",
            ImagePath: "https://upload.wikimedia.org/wikipedia/en/7/76/Home_alone_poster.jpg",
            Featured: false
        },
        {
            _id: "63c6d7d124c7a5871a1aa905",
            Title: "The Mighty Ducks", 
            Description: "After being pulled over for drunk driving, Minneapolis-based attorney …",
            GenreName: "Comedy",
            GenreDescription: "Comedy is a genre of film in which the main emphasis is on humor.",
            DirectorName: "Stephen Herek",
            DirectorBio: "His career as a film director took off in 1986 with the cult horror cl…",
            DirectorBirth: "1958",
            ImagePath: "https://lumiere-a.akamaihd.net/v1/images/p_themightducks_19890_a2cc77d5.jpeg",
            Featured: false
        },
        {
            _id: "63c6cffd24c7a5871a1aa902",
            Title: "Silence of the Lambs", 
            Description: "In 1990, Clarice Starling is pulled from her FBI training at the Quant…",
            GenreName: "Thriller",
            GenreDescription: "Thriller film, also known as suspense film or suspense thriller, is a …",
            DirectorName: "Jonathan Demme",
            DirectorBio: "Robert Jonathan Demme was an American director, producer, and screenwr…",
            DirectorBirth: "1944",
            DirectorDeath: "2017",
            ImagePath: "https://m.media-amazon.com/images/I/81SVDO6WcrL._AC_SY550_.jpg",
            Featured: false
        } 
    ]);

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