export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
        style={{ cursor: "pointer" }}
      >
        {movie.title}
      </div>
    );
  };
    export const MovieView = ({ movie, onBackClick }) => {
        return (
        <div>
            <button onClick={onBackClick}>Back</button>
            <div>
            <img src={movie.image} alt={`Poster of ${movie.title}`} width="200" />
            </div>
            <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            </div>
        </div>
        );
    };  