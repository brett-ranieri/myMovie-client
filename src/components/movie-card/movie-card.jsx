export const MovieCard = ({ movie, onMovieClick }) => { //need to destructure the movie object, and the onMovieClick function from main-view
    return (
        <div
            onClick={() => {
                onMovieClick(movie); //when the div is clicked, call onMovieClick from main-view and pass the props of click movie
            }}
        >
            <div>{movie.Title}</div>
        </div>
    );
};