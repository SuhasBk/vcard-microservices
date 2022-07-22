import { useEffect, useState } from 'react';
import { Button, Card, CardGroup, FloatingLabel, Form } from 'react-bootstrap';
import Alerts from '../alert/Alert';
import UserService from '../auth/UserService';
import CardCoverModal from '../modal/CardCoverModal';
import './Home.css';

function Home() {

    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");
    const [senderObject, setSenderObject] = useState(UserService.getUserDetails());
    const [recipientObject, setRecipientObject] = useState({});
    const [comments, setComments] = useState();
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [coverSrc, setCoverSrc] = useState("/dashboard/search.png");

    // const navigator = useNavigate();

    useEffect(() => {
        setSenderObject(JSON.parse(UserService.getUserDetails()));
    }, []);

    let alertUser = (msg, type, timeout) => {
        setAlertMessage(msg);
        setAlertVariant(type);
        setAlertShow(true);
        if (timeout)
            setTimeout(() => { setAlertShow(false); }, timeout);
    }

    let createCard = () => {
        if(!senderObject.name || !senderObject.email || !recipientObject.name || !recipientObject.email) {
            alertUser("Fields cannot be empty!", "danger", 2500);
            return;
        }
        console.log(senderObject, comments);
        alertUser("Card Created successfully!");
    }

    let searchCardCovers = () => {
        setShowSearchModal(true);
    }

    let updateCardCover = (src) => {
        setCoverSrc(src);
    }

    return (
        <>
            {alertShow && <><Alerts
                message={alertMessage}
                variant={alertVariant}>
            </Alerts><br></br></>}
            <CardCoverModal show={showSearchModal} handleClose={() => {setShowSearchModal(false)}} updateCardCover={updateCardCover}></CardCoverModal>
            <div id="dashboard-content">
                <h1>Create a new card!</h1>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Fill Card Details:</Card.Title>
                            <hr></hr>
                            <Form className="details">
                                <Form.Text>Card Details:</Form.Text>
                                <Form.Group className="w-25" >
                                    <Form.Control type="text" placeholder="Enter Title *" />
                                </Form.Group>

                                <Form.Group className="w-25" >
                                    <Form.Control type="text" placeholder="Enter Category" />
                                </Form.Group>
                            </Form>
                            <hr></hr>
                            <Form className="details">
                                <Form.Text>Recipient Details:</Form.Text>
                                <Form.Group className="w-25" >
                                    <Form.Control type="text" placeholder="Enter Name *"  
                                        onChange={(e) => { setRecipientObject({ ...senderObject, name: e.target.value }) }}/>
                                </Form.Group>

                                <Form.Group className="w-25" >
                                    <Form.Control type="email" placeholder="Enter Email *" 
                                        onChange={(e) => { setRecipientObject({ ...senderObject, email: e.target.value }) }} />
                                </Form.Group>
                            </Form>
                            <hr></hr>
                            <Form className="details">
                                <Form.Text>Sender Details:</Form.Text>
                                <Form.Group className="w-25" >
                                    <Form.Control type="text" placeholder="Enter Name *" 
                                    onChange={(e) => { setSenderObject({...senderObject, name: e.target.value}) }}
                                    value={senderObject.name ?? ""}/>
                                </Form.Group>

                                <Form.Group className="w-25" >
                                    <Form.Control type="email" placeholder="Enter Email *" 
                                    onChange={(e) => { setSenderObject({ ...senderObject, email: e.target.value }) }} 
                                    value={senderObject.email ?? ""} />
                                </Form.Group>
                            </Form>
                            <hr></hr>
                            <Button variant="primary" onClick={() => {createCard()}}>
                                Create!
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card id="card-preview">
                        <Card.Body>
                            <Card.Title>Choose a card cover:</Card.Title>
                            <div id="card-cover" onClick={() => searchCardCovers()}>
                                <iframe src={coverSrc} style={{marginTop: "5%"}} alt="card cover"/>
                            </div>
                            <Form>
                                <FloatingLabel controlId="floatingTextarea2" label="Add a greeting (optional)">
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: '100%' }}
                                        onChange={(e) => {setComments(e.target.value)}}
                                    />
                                </FloatingLabel>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        </>
    );
}

export default Home;