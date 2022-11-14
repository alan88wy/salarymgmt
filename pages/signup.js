import React, {useState} from 'react';
import Router from 'next/router';
import { setCookie } from 'cookies-next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [validated, setValidated] = useState(false);
  const assert = require('assert');

  function handleSubmit(e) {
    e.preventDefault();

    if (login === null || login.length === 0) {
        setSignupSuccess("")
        setSignupError("You must enter user login id!");
        return
    }

    if (password === null || password.length === 0) {
        setSignupSuccess("")
        setSignupError("You must enter a password!");
        return
    }

    setSignupError("")

    fetch('/api/users', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login,
            password,
        }),
    })
    .then((res) => res.json())
    .then((data) => {

        if (data && data.error) {
            setSignupError(data.message);
        }

        if (data && data.token) {
            setSignupSuccess(`User id ${login} added successfully`)
            setCookie('token', data.token, { expires: new Date(Date.now() + (2 * 3600000)) });
            // Router.push('/');
        }
    });

    setValidated(true);
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <p>Sign Up</p>
    //   <label htmlFor="email">
    //     email
    //     <input
    //       value={email}
    //       onChange={(e) => setLogin(e.target.value)}
    //       name="email"
    //       type="email"
    //     />
    //   </label>

    //   <br />

    //   <label for="password">
    //     password
    //     <input
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       name="password"
    //       type="password"
    //     />
    //   </label>

    //   <br />

    //   <input type="submit" value="Submit" />
    //   {signupError && <p style={{color: 'red'}}>{signupError}</p>}
    // </form>

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <br />
        <h1>User Creation</h1>
        <br />
        <Form.Group className="mb-3" controlId="login">
            <Form.Label>Please Enter the user login id</Form.Label>
            <Form.Control type="text" placeholder="Enter user login id" 
                          required onChange={(e) => setLogin(e.target.value)}
             />

        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" placeholder='Enter the use password'
            onChange={(e) => setPassword(e.target.value)} required
            aria-describedby="passwordHelp"
            />
            <Form.Text id="passwordHelp" muted>
            Your password must be 8-20 characters long, contain letters and numbers,
            and must not contain spaces, special characters, or emoji.
            </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        <br/>
        <br/>
        <h4>{signupError ? signupError : " "}</h4>
        <h4>{signupSuccess ? signupSuccess : " "}</h4>
    </Form>
  );
};

export default Signup;
