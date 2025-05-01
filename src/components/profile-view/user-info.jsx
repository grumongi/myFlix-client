import React from 'react';

const UserInfo = ({ username, email }) => {

    console.log(username);
    console.log(email);

    return (
        <>
            <p>User : {username}</p>
            <p>Email: {email}</p>
        </>
    );
};

export default UserInfo;