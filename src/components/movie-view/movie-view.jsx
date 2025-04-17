import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={movie.image?.imageUrl} // Corrected to match API syntax
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({ // Ensure image is an object with imageUrl
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};