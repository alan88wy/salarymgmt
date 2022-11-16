import React, {useState} from 'react';
import Router from 'next/router';
import { setCookie } from 'cookies-next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const Login = () => {
    const [signInError, setSignInError] = useState('');
    const [signInSuccess, setSignInSuccess] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [validated, setValidated] = useState(false);
    
    // const router = useRouter()

    function handleSubmit(e) {
        e.preventDefault()

        if (login === null || login.length === 0) {
            setSignInSuccess("")
            setSignInError("You must enter user login id!")
            return
        } else if (password === null || password.length === 0) {
            setSignInSuccess("")
            setSignInError("You must enter a password!")
            return
        } else {
            setSignInError("")

            
           fetch('/api/authenticate', {
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
                    setSignInError(data.message);
                    return
                }

                if (data && data.success) {
                    
                    setSignInSuccess(`User id ${login} login successfully. Click Home to continue`)
                    setCookie('token', data.token, { expires: new Date(Date.now() + (2 * 3600000)) })
                    
                    Router.push({
                        pathname: '/',
                    })
        
                }

            })

            
            setValidated(true);
        }
    }

    return (
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <br />
            <h1>User Login</h1>
            <br />
            <Form.Group className="mb-3" controlId="login">
                <Form.Label>Please Enter the user login id</Form.Label>
                <Form.Control type="text" placeholder="Enter user login id"
                            required onChange={(e) => setLogin(e.target.value)}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Control type="password" placeholder='Enter the user password'
                onChange={(e) => setPassword(e.target.value)} required
                // aria-describedby="passwordHelp"
                />
                {/* <Form.Text id="passwordHelp" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
                </Form.Text> */}
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            <br/>
            <br/>
            <h4>{signInError ? signInError : signInSuccess ? signInSuccess : " "}</h4>
        </Form>
    )
}

export default Login
