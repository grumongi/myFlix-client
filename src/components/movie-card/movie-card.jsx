import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    console.log(movie);
    return (
        <div
            className="movie-card"
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title || "Untitled Movie"}
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string,
        description: PropTypes.string,
        imagePath: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};