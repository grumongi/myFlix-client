import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './user-info';
import FavoriteMovies from './favourite-movies';
import UpdateUser from './update-user';

const ProfileView = ({ urlAPI, user, token, movies }) => {
    useEffect(() => {
        console.log("ProfileView Props:", { urlAPI, user, token, movies });
    }, [urlAPI, user, token, movies]);

    // Normalize user object if necessary (in case the props might have different casing)
    const normalizedUser = {
        username: user.Username || user.username,
        email: user.Email || user.email,
        birthday: user.Birthday || user.birthday,
        fullName: user.FullName || user.fullName || "N/A", // Use fallback for missing fullName
        favoriteMovies: user.FavoriteMovies || user.favoriteMovies || [], // Fallback to empty array if missing
    };

    // Safely format birthday
    const formattedBirthday = normalizedUser.birthday
        ? new Date(normalizedUser.birthday).toISOString().split('T')[0]
        : "N/A";

    // Handle favorite movies safely
    const favoriteMovies = Array.isArray(normalizedUser.favoriteMovies)
        ? normalizedUser.favoriteMovies.map((fav) => typeof fav === 'object' ? fav._id : fav).filter(Boolean)
        : [];

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Profile</h2>
            <UserInfo
                username={normalizedUser.username || "N/A"}
                email={normalizedUser.email || "N/A"}
                fullName={normalizedUser.fullName}
                birthday={formattedBirthday}
            />
            <FavoriteMovies
                urlAPI={urlAPI}
                user={user}
                token={token}
                movies={movies}
                favoriteMovies={favoriteMovies}
            />
            <UpdateUser
                urlAPI={urlAPI}
                user={user}
                token={token}
            />
        </div>
    );
};

ProfileView.propTypes = {
    urlAPI: PropTypes.string.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        fullName: PropTypes.string,
        birthday: PropTypes.string,
        favoriteMovies: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string, // movie id
                PropTypes.shape({ _id: PropTypes.string.isRequired }) // movie object
            ])
        ),
    }).isRequired,
    token: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
};

export default ProfileView;
