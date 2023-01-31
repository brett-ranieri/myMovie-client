export const MovieView = ({ movie, onBackClick }) => { //need to destructure movie object, and onBackClick from main-view
    return (
        <div>
            <div>
                <img src={movie.ImagePath} alt="movie poster" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Synopsis: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.DirectorName}</span>
            </div>
            <div>
                <span>Director Bio: </span>
                <span>{movie.DirectorBio}</span>
            </div>
            <div>
                <span>Director Birth Year: </span>
                <span>{movie.DirectorBirth}</span>
            </div>
            <div>
                <span>Director Death Year: </span>
                <span>{movie.DirectorDeath}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.GenreName}</span>
            </div>
            <div>
                <span>Genre Description: </span>
                <span>{movie.GenreDescription}</span>
            </div>
            <button onClick={onBackClick}>Back</button> 
        </div> //button calls onBackClick function from main-view when clicked
    );
};