import './Registration.css';
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import TriggerAPI from "../api/Api";
import UserService from "../auth/UserService";
import useAlert from '../alert/useAlert';

function Registration(props) {
    const [username, setUserName] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const {setAlert} = useAlert();

    useEffect(() => {
        window.history.replaceState({}, document.title);
    }, []);

    let registerUser = () => {
        if(!username || !password || !email || !name) {
            setAlert("Please fill in all fields!", "danger");
            return;
        }
        TriggerAPI("auth-service", "register", "POST",
            {
                username: username,
                password: password,
                email: email,
                name: name
            })
            .then(response => response.text())
            .then(data => {
                if (data.includes("Invalid")) {
                    setAlert("Username already exists. Try Again!", "danger")
                } else {
                    setAlert("Registered Successfully. Logging in...", "success");
                    UserService.loginUser(username, data, () => {
                        window.location.href = "/dashboard";
                    });
                }
            });
    }

    return (
        <>
            <div id="register-card-content">
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
                                <Card.Title>REGISTER AN ACCOUNT TODAY !</Card.Title>
                                <Form.Group className="mb-3" controlId="name" style={{ marginTop: "5%" }}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your full name *"
                                        onChange={(e) => { setName(e.target.value) }} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username *"
                                        onChange={(e) => { setUserName(e.target.value) }} required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Email *" 
                                        onChange={(e) => { setEmail(e.target.value) }} required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password *"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        onKeyUp={(e) => {
                                            if (e.key === "Enter") {
                                                registerUser();
                                            }
                                        }} required/>
                                </Form.Group>
                                <Card.Footer>
                                    <Button variant="primary" onClick={() => { registerUser() }}>
                                        Register
                                    </Button><br></br><br></br>
                                    Have an account already? <a href="/signin">Login Now!</a>
                                </Card.Footer>
                            </Card.Body>
                        </Form>
                    </Card.ImgOverlay>
                </Card>
            </div>
        </>
    );
}

export default Registration;