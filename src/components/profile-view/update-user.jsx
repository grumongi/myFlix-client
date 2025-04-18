import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";

const UpdateUser = ({ urlAPI, user, token }) => {
  const [username, setUsername] = useState(user.userName || "");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState(user.firstName || "");
  const [lastname, setLastname] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");

  const [birthday, setBirthday] = useState(() => {
    if (!user.birthDate) return "";
    const parsedDate = new Date(user.birthDate);
    if (isNaN(parsedDate.getTime())) {
      console.warn("Invalid birthDate received:", user.birthDate);
      return "";
    }
    return parsedDate.toISOString().split("T")[0];
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      userName: username,
      email,
      firstName: firstname,
      lastName: lastname,
      birthDate: birthday,
    };

    if (password) {
      data.password = password;
    }

    try {
      const response = await fetch(`${urlAPI}/users/${user.userName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Profile update successful");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert("Profile update failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const response = await fetch(`${urlAPI}/users/${user.userName}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Profile deleted successfully");
        localStorage.clear();
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert("Profile deletion failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="3"
      />

      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Leave blank to keep current password"
      />

      <Form.Label>First Name:</Form.Label>
      <Form.Control
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />

      <Form.Label>Last Name:</Form.Label>
      <Form.Control
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />

      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Form.Label>Birthday:</Form.Label>
      <Form.Control
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />

      <Row className="mt-3">
        <Col>
          <Button variant="primary" type="submit">Update Profile</Button>
        </Col>
        <Col>
          <Button variant="danger" type="button" onClick={handleDelete}>
            Delete Account
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateUser;
