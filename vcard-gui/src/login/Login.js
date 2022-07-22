import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Alerts from '../alert/Alert';
import TriggerAPI from '../api/Api';
import UserService from '../auth/UserService';
import './Login.css';

function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");

    const location = useLocation();

    useEffect(() => {
        // to clear out the "protected route redirect" errors in history object:
        window.history.replaceState({}, document.title);
    }, []);

    let alertUser = (msg, type, timeout) => {
        setAlertMessage(msg);
        setAlertVariant(type);
        setAlertShow(true);
        if (timeout)
            setTimeout(() => { setAlertShow(false); }, timeout);
    }

    let loginUser = () => {
        if(!username || !password) {
            alertUser("Please fill in all fields!", "danger", 2500);
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
                alertUser(token, "danger", 2500);
            } else {
                alertUser("You are now logged in, redirecting...", "success", null);
                UserService.loginUser(username, token, () => {
                    window.location.href = "/dashboard";
                });
            } 
        })
        .catch(err => {
            alertUser("Server not responding.", "danger", 2500);
        });
    }

    return (
        <>
            {location.state && <><Alerts message={location.state.error} variant="danger"></Alerts></>}
            {alertShow && <><Alerts
                message={alertMessage}
                variant={alertVariant}>
            </Alerts></>}
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
                                <Card.Footer>
                                    <Button variant="primary" onClick={() => {loginUser()}}>
                                        Login
                                    </Button><br></br><br></br>
                                    Need an account? <a href="/register">Register Now!</a>
                                </Card.Footer>
                            </Card.Body>
                        </Form>
                    </Card.ImgOverlay>
                </Card>
            </div>
        </>
    );
}

export default Login;