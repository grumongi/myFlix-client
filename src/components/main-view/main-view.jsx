import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A thief who enters the dreams of others to steal secrets is given a chance to have his past crimes forgiven.",
      image: "https://m.media-amazon.com/images/I/51s+VXcJ9vL._AC_.jpg",
      genre: "Science Fiction",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "The Matrix",
      description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
      image: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
      genre: "Action, Sci-Fi",
      director: "Lana Wachowski, Lilly Wachowski",
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
      image: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
      genre: "Adventure, Drama, Sci-Fi",
      director: "Christopher Nolan",
    },
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  );
};