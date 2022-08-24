import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import useAlert from '../alert/useAlert';
import TriggerAPI from '../api/Api';
import AuthService from '../auth/AuthService';
import UserService from '../auth/UserService';
import './Login.css';

function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const {setAlert} = useAlert();

    useEffect(() => {
        // to clear out the "protected route redirect" errors in history object:
        window.history.replaceState({}, document.title);
        // remove left over tokens:
        AuthService.clearToken();
    }, []);

    let loginUser = () => {
        if(!username || !password) {
            setAlert("Please fill in all fields!", "danger");
            return;
        }
        TriggerAPI("auth-service", "login", "POST",
        {
            username: username,
            password: password
        })
        .then(response => response.text())
        .then(token => {
            if(token.includes("Invalid")) {
                setAlert(token, "danger");
            } else {
                setAlert("You are now logged in, redirecting...", "success");
                UserService.loginUser(username, token, () => {
                    window.location.href = "/dashboard";
                });
            } 
        });
    }

    return (
        <>
            <div id="login-card-content">
                <Card>
                    <Card.Img src="login/login.png" style={
                        {
                            height: "70vh",
                            width: "60vw",
                            filter: "brightness(50%)"
                        }
                    }></Card.Img>
                    <Card.ImgOverlay>
                        <Form>
                            <Card.Body>
                                <Card.Title>LOGIN TO YOUR ACCOUNT !</Card.Title>
                                    <Form.Group className="mb-3" controlId="username" style={{ marginTop: "10%" }}>
                                        <Form.Label>Username *</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" 
                                            onChange={(e) => { setUserName(e.target.value) }} required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password *</Form.Label>
                                        <Form.Control type="password" placeholder="Password" 
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            onKeyUp={(e) => {
                                                if(e.key === "Enter") {
                                                    loginUser();
                                                }
                                            }} required/>
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => {loginUser()}}>
                                        Login
                                    </Button><br></br><br></br>
                                    Need an account? <a href="/register">Register Now!</a>
                            </Card.Body>
                        </Form>
                    </Card.ImgOverlay>
                </Card>
            </div>
        </>
    );
}

export default Login;