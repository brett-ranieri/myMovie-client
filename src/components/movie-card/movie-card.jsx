import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => { //need to destructure the movie object, and the onMovieClick function from main-view
    return (
        <div
            onClick={() => {
                onMovieClick(movie); //when the div is clicked, call onMovieClick from main-view and pass the props of click movie
                console.log(movie._id);
            }}
        >
            <div>{movie.title}</div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        directorName: PropTypes.string.isRequired,
        directorBio: PropTypes.string.isRequired,
        directorBirth: PropTypes.string.isRequired,
        directorDeath: PropTypes.string,
        genreName: PropTypes.string.isRequired,
        genreDescription: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};