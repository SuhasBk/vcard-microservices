import { useEffect, useState } from "react";
import { Button, Card, CardGroup, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAlert from "../../alert/useAlert";
import TriggerAPI from "../../api/Api";
import UserService from "../../auth/UserService";
import CardCoverModal from "../../modal/CardCoverModal";
import './NewCard.css';

function NewCard() {

    const navigator = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [senderObject, setSenderObject] = useState(UserService.getUserDetails());
    const [recipientObject, setRecipientObject] = useState({});
    const [comments, setComments] = useState("");
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { setAlert } = useAlert();
    const [gifObject, setGifObject] = useState({});

    useEffect(() => {
        setSenderObject(JSON.parse(UserService.getUserDetails()));
    }, []);

    let createCard = () => {
        if (!title || !senderObject.name || !senderObject.email || !recipientObject.name || !recipientObject.email) {
            setAlert("Fields cannot be empty!", "danger");
            return;
        }

        let payload = {
            fromName: senderObject.name,
            fromEmail: senderObject.email,
            toName: recipientObject.name,
            toEmail: recipientObject.email,
            title: title,
            category: category,
            createdBy: senderObject.username,
            cards: []
        };

        if (Object.keys(gifObject).length > 0 || comments) {
            payload.cards.push({
                gif: gifObject,
                text: comments
            })
        }

        TriggerAPI("vcard-service", "createCard", "POST", payload)
            .then(data => data.json())
            .then((data) => {
                if (data) {
                    setAlert("Card Created successfully!", "success");
                    navigator("/editcard", { state: { cardId: data } });
                }
            });
    }

    let searchCardCovers = () => {
        setShowSearchModal(true);
    }

    let updateCardCover = (gif) => {
        setShowSearchModal(false);
        setGifObject(gif);
    }

    return ( 
        <div className="newcard-content">
            <CardCoverModal show={showSearchModal} handleClose={() => { setShowSearchModal(false) }} updateCardCover={updateCardCover}></CardCoverModal>
            <h1>Create a new card!</h1>
            <CardGroup>
                <Card id="card-details">
                    <Card.Body>
                        <Card.Title>Fill Card Details:</Card.Title>
                        <hr></hr>
                        <Form className="details">
                            <Form.Group className="w-10" >
                                <Form.Control type="text" placeholder="Card Title *"
                                    onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="w-10" >
                                <Form.Control type="text" placeholder="Card Category"
                                    onChange={(e) => setCategory(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <hr></hr>
                        <Form className="details">
                            <Form.Group className="w-10" >
                                <Form.Control type="text" placeholder="Recipient Name *"
                                    onChange={(e) => { setRecipientObject({ ...recipientObject, name: e.target.value }) }} />
                            </Form.Group>
                            <Form.Group className="w-10" >
                                <Form.Control type="email" placeholder="Recipient Email *"
                                    onChange={(e) => { setRecipientObject({ ...recipientObject, email: e.target.value }) }} />
                            </Form.Group>
                        </Form>
                        <hr></hr>
                        <Form className="details">
                            <Form.Group className="w-10" >
                                <Form.Control type="text" placeholder="Sender Name *"
                                    onChange={(e) => { setSenderObject({ ...senderObject, name: e.target.value }) }}
                                    value={senderObject.name ?? ""} />
                            </Form.Group>
                            <Form.Group className="w-10" >
                                <Form.Control type="email" placeholder="Sender Email *"
                                    onChange={(e) => { setSenderObject({ ...senderObject, email: e.target.value }) }}
                                    value={senderObject.email ?? ""} />
                            </Form.Group>
                        </Form>
                        <hr></hr>
                        <Button variant="primary" onClick={() => { createCard() }}>
                            Continue!
                        </Button>
                    </Card.Body>
                </Card>
                <Card id="card-preview">
                    <Card.Body>
                        <Card.Title>Choose a card cover:</Card.Title>
                        <div id="card-cover">
                            <iframe title="preview" src={gifObject.url ? gifObject.url : ""} style={{ marginTop: "5%" }} alt="card cover"/>
                            <Button className="search-btn" variant="outline-dark" onClick={() => searchCardCovers()}>Search Covers...</Button>
                        </div>
                        <Form>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments (optional)">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100%', marginTop: '1%' }}
                                    onChange={(e) => { setComments(e.target.value) }}
                                />
                            </FloatingLabel>
                        </Form>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
     );
}

export default NewCard;