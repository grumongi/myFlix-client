import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    console.log("VIEW INSIDE");
    console.log(movie);

    return (
        <div>
            <div>
                <img 
                    src={movie.image?.imageUrl || "default-image.jpg"} 
                    alt={movie.title || "Movie Image"} 
                />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title || "Untitled Movie"}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description || "No description available."}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre?.name || "Unknown Genre"}</span>
                <p>{movie.genre?.description || "No genre description available."}</p>
            </div>
            <div>
                <span>Directed by: </span>
                <span>{movie.director?.name || "Unknown Director"}</span>
                <p>{movie.director?.bio || "No director bio available."}</p>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired, 
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.shape({
            imageUrl: PropTypes.string.isRequired
        }).isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string
        }).isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};