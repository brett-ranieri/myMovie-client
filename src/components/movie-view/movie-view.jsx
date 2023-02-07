export const MovieView = ({ movie, onBackClick }) => { //need to destructure movie object, and onBackClick from main-view
    return (
        <div>
            <div>
                <img className="w-100" src={movie.imagePath} alt="movie poster" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Synopsis: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.directorName}</span>
            </div>
            <div>
                <span>Director Bio: </span>
                <span>{movie.directorBio}</span>
            </div>
            <div>
                <span>Director Birth Year: </span>
                <span>{movie.directorBirth}</span>
            </div>
            <div>
                <span>Director Death Year: </span>
                <span>{movie.directorDeath}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genreName}</span>
            </div>
            <div>
                <span>Genre Description: </span>
                <span>{movie.genreDescription}</span>
            </div>
            <button onClick={onBackClick}>Back</button> 
        </div> //button calls onBackClick function from main-view when clicked
    );
};