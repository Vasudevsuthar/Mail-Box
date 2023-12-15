import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import classes from "./Login.module.css";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email || !password) {
      setError("All fields are mandatory!!");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        dispatch(authActions.login(data.idToken));
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.idToken);
        alert("Login successful");
        nav("/home");
      } else {
        setIsLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className={classes.Container}>
        <Card className={classes.card}>
          <Card.Title className={classes.title}>Login</Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className={classes.Button} variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <Button className={classes.Button} variant="secondary" type="submit">
            Don't have an account? Sing Up
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Login;
