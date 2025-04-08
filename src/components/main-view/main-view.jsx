import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    const url = "https://cinema-center-api-2025-64a4a412d09b.herokuapp.com/movies";
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMovies(data);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id} // Use a unique identifier here
                    movie={movie}
                    onMovieClick={(newSelection) => setSelectedMovie(newSelection)}
                />
            ))}
        </div>
    );
};