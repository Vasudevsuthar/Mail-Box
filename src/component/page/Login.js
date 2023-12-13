import React, {useContext, useRef, useState} from 'react'
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import classes from './Login.module.css';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const ctx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLoading, setIsLoading] =useState(false);
    const nav = useNavigate();

    const submitHandler = async (e) =>{
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);

        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",{
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response.ok){
                const data = await response.json();
                    ctx.login(data.idToken, enteredEmail);
                    alert("Login successful");
                    nav("/home");
            }else{
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
        }catch(error){
            console.log(error.message);
        }

        setIsLoading(false);
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
                ref={emailInputRef}
              type="email"
              placeholder="Enter your email"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passwordInputRef}
              type="password"
              placeholder="Password"
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
  )
}

export default Login