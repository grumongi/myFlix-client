import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './user-info';
import FavoriteMovies from './favourite-movies';
import UpdateUser from './update-user';

const ProfileView = ({ urlAPI, user, token, movies }) => {
    
    useEffect(() => {
        console.log("ProfileView Props:", { urlAPI, user, token, movies });
    }, [urlAPI, user, token, movies]);

   
    if (!user || !user.username || !user.email) {
        return <div>Error: User data is missing or invalid. Please log in again.</div>;
    }

    
    const formattedBirthday = user.birthday?.$date
        ? new Date(user.birthday.$date).toISOString().split('T')[0]
        : "N/A";

    return (
        <>
            <h2>Profile</h2>
            <UserInfo
                username={user.username}
                email={user.email}
                fullName={user.fullName}
                birthday={formattedBirthday}
            />
            <FavoriteMovies
                urlAPI={urlAPI}
                user={user}
                token={token}
                movies={movies}
                favoriteMovies={user.favoriteMovies.map((fav) => fav.$oid)} // Map favoriteMovies to IDs
            />
            <UpdateUser
                urlAPI={urlAPI}
                user={user}
                token={token}
            />
        </>
    );
};

ProfileView.propTypes = {
    urlAPI: PropTypes.string.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        fullName: PropTypes.string,
        birthday: PropTypes.shape({
            $date: PropTypes.string,
        }),
        favoriteMovies: PropTypes.arrayOf(
            PropTypes.shape({
                $oid: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
};

export default ProfileView;