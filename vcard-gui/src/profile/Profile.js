import './Profile.css';
import UserService from "../auth/UserService";
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import TriggerAPI from '../api/Api';
import useAlert from '../alert/useAlert';

function Profile() {

    const [userObject, setUserObject] = useState(UserService.getUserDetails());
    const {setAlert} = useAlert();

    useEffect(() => {
        setUserObject(JSON.parse(UserService.getUserDetails()));
    }, []);

    let updateUser = () => {
        if (!userObject.username || !userObject.password || !userObject.email || !userObject.name) {
            setAlert("Fields cannot be empty!", "danger");
            return;
        }
        TriggerAPI("users-service", "updateUser", "POST",
            {
                id: userObject.id,
                username: userObject.username,
                password: userObject.password,
                email: userObject.email,
                name: userObject.name
            })
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    setAlert(data.error, "danger");
                } else {
                    setAlert("Profile updated successfully!", "success");
                    UserService.loginUser(data.userObject.username, data.userToken, () => {
                        window.location.href = "/dashboard";
                    });
                }
            });
    }

    return (
        <>
            <div id="profile-view">
                <h3>Hello, {userObject.username}!</h3>
                <Form id="user-form">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name"
                            onChange={(e) => { setUserObject({...userObject, name: e.target.value}) }} 
                            value={userObject.name ?? ""}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username (Cannot Be Modified)</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                            // onChange={(e) => { setUserObject({ ...userObject, username: e.target.value }) }} 
                            value={userObject.username ?? ""}
                            required 
                            disabled/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address *</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            onChange={(e) => { setUserObject({ ...userObject, email: e.target.value }) }} 
                            value={userObject.email ?? ""}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password *</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            onChange={(e) => { setUserObject({ ...userObject, password: e.target.value }) }}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    updateUser();
                                }
                            }} required />
                    </Form.Group>
                    <Button variant="primary" onClick={() => { updateUser() }}>
                        Update Profile
                    </Button>
                </Form>
            </div> 
        </>
    );
}

export default Profile;