import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const [user, setUser] = useState({ email: "", pass: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChangeEmail = (event) => {
    setUser((prev) => ({ ...prev, email: event.target.value }));
  };

  const onChangePass = (event) => {
    setUser((prev) => ({ ...prev, pass: event.target.value }));
  };

  const onSubmit = () => {
    login(user);
    navigate("/");
  };
  return (
    <div className="app">
      <h3>Login to app:</h3>
      <Form className="w-50">
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={onChangeEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={user.pass}
            onChange={onChangePass}
          />
        </Form.Group>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
