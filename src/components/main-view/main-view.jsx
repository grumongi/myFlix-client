import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";

import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    let parsedUser = null;
    try {
        parsedUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
        console.error("Invalid user data in localStorage. Clearing it.");
        localStorage.removeItem("user");
    }

    const [user, setUser] = useState(parsedUser);
    const [token, setToken] = useState(storedToken || null);

    const urlAPI = "https://cinema-center-api-2025-64a4a412d09b.herokuapp.com";
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!token || !user) return;

        console.log("Current User:", user); // Debugging: Log the user object

        // Fetch user info to refresh frontend data
        fetch(`${urlAPI}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch user info");
                return response.json();
            })
            .then((users) => {
                const updatedUser = users.find((u) => u.username === user.username); // Ensure correct property
                if (updatedUser) {
                    setUser(updatedUser);
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                }
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
            });

        // Fetch movies
        setIsLoading(true);
        fetch(`${urlAPI}/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch movies");
                return response.json();
            })
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [token, user?.username]);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const handleLogin = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const MovieDetails = () => {
        const { movieId } = useParams();
        const movie = movies.find((m) => m._id === movieId);

        if (!movie) {
            return <div>Movie not found!</div>;
        }

        return <MovieView movie={movie} movies={movies} />;
    };

    return (
        <BrowserRouter>
            <NavigationBar user={user} onLogout={handleLogout} />
            <Routes>
                {!user ? (
                    <>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<LoginView onLoggedIn={handleLogin} />} />
                        <Route path="/signup" element={<SignupView />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Navigate to="/movies" replace />} />
                        <Route
                            path="/movies"
                            element={
                                <Row>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : movies.length === 0 ? (
                                        <div>The list is empty!</div>
                                    ) : (
                                        movies.map((movie) => (
                                            <Col
                                                className="mb-5"
                                                key={movie._id}
                                                lg={2}
                                                md={3}
                                                sm={12}
                                            >
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))
                                    )}
                                </Row>
                            }
                        />
                        <Route path="/movies/:movieId" element={<MovieDetails />} />
                        <Route
                            path="/profile"
                            element={
                                user && user.username ? ( // Validate user before rendering ProfileView
                                    <ProfileView
                                        urlAPI={urlAPI}
                                        user={user}
                                        token={token}
                                        movies={movies}
                                    />
                                ) : (
                                    <div>Error: User data is missing or invalid. Please log in again.</div>
                                )
                            }
                        />
                        <Route path="*" element={<Navigate to="/movies" replace />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

