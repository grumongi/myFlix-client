import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null); // Fixed initialization
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const urlAPI = "https://cinema-center-api-2025-64a4a412d09b.herokuapp.com";
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch(urlAPI + "/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setMovies(data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                alert("Failed to load movies. Please try again later.");
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    localStorage.setItem("user", user);
                    setToken(token);
                    localStorage.setItem("token", token);
                }} />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => {
            return movie.genre.name === selectedMovie.genre.name
                && movie.title !== selectedMovie.title;
        });
        console.log(similarMovies);
        return (
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}   
                        onBackClick={() => setSelectedMovie(null)} />
                    <hr />
                    <h2>Similar Movies</h2>
                    <Row className="justify-content-md-center">
                        {similarMovies.map((movie) => (
                            <Col className="mb-5" key={movie._id} lg={3} md={4} sm={12}>
                                <MovieCard
                                    movie={movie} 
                                    onMovieClick={(newSelection) => {
                                        setSelectedMovie(newSelection);
                                    }}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <Row>
            {movies.map((movie) => (
                <Col className="mb-5" key={movie._id} lg={2} md={3} sm={12}>
                    <MovieCard
                        movie={movie} 
                        onMovieClick={(newSelection) => {
                            setSelectedMovie(newSelection);
                        }}
                    />
                </Col>
            ))}
            <Col sm={12}>
                <Button
                    variant="primary"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.removeItem("user"); // Clear user from localStorage
                        localStorage.removeItem("token"); // Clear token from localStorage
                    }}
                >
                    Logout
                </Button>
            </Col>
        </Row>
    );
};