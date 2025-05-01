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
    const [searchQuery, setSearchQuery] = useState(""); // Single search bar for title, genre, and director

    useEffect(() => {
        if (!token || !user) return;

        console.log("Current User in MainView:", user); // Debugging: Log the user object

        // Fetch user info to refresh frontend data
        fetch(`${urlAPI}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch user info");
                return response.json();
            })
            .then((users) => {
                const updatedUser = users.find((u) => u.Username === user.Username || u.username === user.username); // match either casing
                if (updatedUser) {
                    const normalizedUser = {
                        username: updatedUser.Username || updatedUser.username,
                        email: updatedUser.Email || updatedUser.email,
                        birthday: updatedUser.Birthday || updatedUser.birthday,
                        fullName: updatedUser.FullName || updatedUser.fullName || '',
                        favoriteMovies: updatedUser.FavoriteMovies || updatedUser.favoriteMovies || [],
                        _id: updatedUser._id,
                    };
                    setUser(normalizedUser);
                    localStorage.setItem("user", JSON.stringify(normalizedUser));
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
        console.log("Logging in user:", user);
        const normalizedUser = {
            username: user.Username || user.username,
            email: user.Email || user.email,
            birthday: user.Birthday || user.birthday,
            fullName: user.FullName || user.fullName || '',
            favoriteMovies: user.FavoriteMovies || user.favoriteMovies || [],
            _id: user._id,
        };
        setUser(normalizedUser);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
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

    // Filter movies based on the search query
    const filteredMovies = movies.filter((movie) => {
        const matchesTitle = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = movie.genre?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDirector = movie.director?.name?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTitle || matchesGenre || matchesDirector;
    });

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
                                <>
                                    <div style={{ padding: "1rem" }}>
                                        <input
                                            type="text"
                                            placeholder="Search movies by title, genre, or director..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
                                        />
                                    </div>
                                    <Row>
                                        {isLoading ? (
                                            <div>Loading...</div>
                                        ) : filteredMovies.length === 0 ? (
                                            <div>No movies match your search!</div>
                                        ) : (
                                            filteredMovies.map((movie) => (
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
                                </>
                            }
                        />
                        <Route path="/movies/:movieId" element={<MovieDetails />} />
                        <Route
                            path="/profile"
                            element={
                                user ? (
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
