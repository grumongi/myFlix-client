import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    // API URL
    const urlAPI = "https://cinema-center-api-2025-64a4a412d09b.herokuapp.com";
    const [username, setUsername] = useState(""); // Changed from null to ""
    const [password, setPassword] = useState(""); // Changed from null to ""

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password
        };
        console.log(data);

        fetch(urlAPI + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="8" // Fixed from minlength to minLength
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8" // Fixed from minlength to minLength
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};