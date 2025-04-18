import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  console.log(movie);
  return (
      <Card className="h-100">
          <Card.Img
              variant="top"
              src={movie.image?.imageUrl} 
              alt={`${movie.title} poster`} // Add an alt attribute for accessibility
              className="w-100"
          />
          <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.director.name}</Card.Text>
              <Link to={`/movies/${movie._id}`}> {/* Link for navigation */}
                  <Button variant="link">Open</Button>
              </Link>
          </Card.Body>
      </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensure _id is required
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({ 
      imageUrl: PropTypes.string.isRequired
    }).isRequired,
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
  }).isRequired
};