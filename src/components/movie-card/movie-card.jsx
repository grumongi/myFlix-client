import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
      style={{ cursor: "pointer" }}
    >
      <h3>{movie.title}</h3>
      <img
        src={movie.image} // Ensure this points to a valid image URL
        alt={`${movie.title} poster`}
        style={{ width: "200px", height: "300px", objectFit: "cover" }} // Adjust styling as needed
      />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string
      })
    ]),
    director: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string
      })
    ]),
    description: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
