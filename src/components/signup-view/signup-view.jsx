import React, { useState } from "react";

export const SignupView = () => {
    // API URL
    const urlAPI = "https://cinema-center-api-2025-64a4a412d09b.herokuapp.com";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username, // Changed from userName to Username
            Password: password,
            Email: email,
            FirstName: firstname, // Changed from firstName to FirstName
            LastName: lastname,   // Changed from lastName to LastName
            Birthday: birthday   // Changed from birthDate to Birthday
        };
        console.log(data);

        fetch(urlAPI + "/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
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
                    required
                    minLength="5" // Updated from 3 to 5
                    pattern="[a-zA-Z0-9]+" // Added pattern to enforce alphanumeric validation
                    title="Username must be at least 5 characters long and contain only alphanumeric characters"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};