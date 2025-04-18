import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={movie.image?.imageUrl}
        alt={`${movie.title} poster`}
        style={{ width: "300px", height: "450px", objectFit: "cover" }}
      />
      <p>
        <strong>Genre:</strong>{" "}
        {typeof movie.genre === "object" ? movie.genre.name : movie.genre}
      </p>
      <p>
        <strong>Director:</strong>{" "}
        {typeof movie.director === "object" ? movie.director.name : movie.director}
      </p>
      <p>
        <strong>Description:</strong> {movie.description}
      </p>
      <Link to="/movies">
        <button>Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired
    }).isRequired,
    description: PropTypes.string.isRequired,
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
    ])
  }).isRequired
};