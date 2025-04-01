export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <button onClick={onBackClick}>Back</button>
        <div>
          <img src={movie.image} alt={`Poster of ${movie.title}`} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
      </div>
    );
  };