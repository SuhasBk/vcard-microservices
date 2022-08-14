import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import UserService from '../auth/UserService';
import './Home.css';
import MyCards from './mycards/MyCards';
import NewCard from './newcard/NewCard';

function Home() {

    const [user] = useState(JSON.parse(UserService.getUserDetails()));

    return (
        <div className="dashboard-content">
            <h3>Welcome back, {user.username}!</h3>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>My Cards</Accordion.Header>
                    <Accordion.Body>
                        <MyCards user={user}/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Create New Card</Accordion.Header>
                    <Accordion.Body>
                        <NewCard />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default Home;