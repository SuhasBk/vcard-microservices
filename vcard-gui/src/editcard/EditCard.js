import { useEffect, useState } from "react";
import { Button, CardGroup, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useAlert from "../alert/useAlert";
import TriggerAPI from "../api/Api";
import CardCoverModal from "../modal/CardCoverModal";
import './EditCard.css';
import GifCard from "./GifCard/GifCard";

export default function EditCard() {

    const location = useLocation();
    let navigator = useNavigate();
    const {setAlert} = useAlert();
    const [cardDetails, setCardDetails] = useState({});
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [senderObject, setSenderObject] = useState({});
    const [recipientObject, setRecipientObject] = useState({});
    const [cards, setCards] = useState([]);

    if(!location.state?.cardId) {
        setAlert("You shouldn't be here...");
        navigator("/dashboard");
    }

    useEffect(() => {
        if (location.state?.cardId) {
            let cardId = location.state.cardId;
            TriggerAPI("vcard-service", 'getCard', "POST", {cardId: cardId})
                .then(response => response.json())
                .then(cardDetails => {
                    setCardDetails(cardDetails);
                    setTitle(cardDetails.title);
                    setCategory(cardDetails.category);
                    setSenderObject({name: cardDetails.fromName, email: cardDetails.fromEmail});
                    setRecipientObject({ name: cardDetails.toName, email: cardDetails.toEmail });
                    setCards(cardDetails.cards);
                });
        }
    }, [location]);

    let deleteCard = (cardIndex) => {
        if(window.confirm("Are you sure you want to card number - " + (cardIndex+1) + " ?")) {
            setCards(cards.filter((_, index) => index !== cardIndex));
        } else {
            return;
        }
    }

    let searchCardCovers = (cardIndex) => {
        setShowSearchModal(true);
        setSelectedCardIndex(cardIndex);
    }

    let updateCardCover = (gifObject) => {
        let existingCards = [...cards];
        existingCards[selectedCardIndex].gif = gifObject;
        setCards(existingCards);
        setShowSearchModal(false);
    }

    let updateCardComment = (cardIndex, comments) => {
        let existingCards = [...cards];
        existingCards[cardIndex].text = comments;
        setCards(existingCards);
    }

    let validateCards = (cards) => {
        if(cards.filter(card => (Object.keys(card.gif).length === 0 && !card.text)).length > 0) {
            return false;
        }
        return true;
    }

    let saveCardDetails = () => {
        let editedCardDetails = {};
        editedCardDetails.cardId = cardDetails.cardId;
        editedCardDetails.category = category;
        editedCardDetails.createdBy = cardDetails.createdBy;
        editedCardDetails.title = title;
        editedCardDetails.fromEmail = senderObject.email;
        editedCardDetails.fromName = senderObject.name;
        editedCardDetails.toEmail = recipientObject.email;
        editedCardDetails.toName = recipientObject.name;
        editedCardDetails.cards =  cards;

        if (!editedCardDetails.title || !editedCardDetails.fromName || !editedCardDetails.fromEmail || !editedCardDetails.toName || !editedCardDetails.toEmail) {
            setAlert("Fields cannot be empty!", 'danger');
            return;
        }

        if(!validateCards(editedCardDetails.cards)) {
            setAlert("Please delete empty cards. Cards must have either comments or GIF!", 'danger');
            return;
        }
        
        console.log("All good!", editedCardDetails);

        TriggerAPI("vcard-service", "saveCard", "PUT", editedCardDetails)
        .then(response => response.text)
        .then(data => {
            if(data) {                
                navigator("/mycards");
                setAlert("Card Saved Successfully!", 'success');
            } else {
                setAlert("Something went wrong. Try again later.", 'danger');
            }
        })
    }

    let addNewCard = () => {
        let existingCards = [...cards]
        existingCards.push({gif:{}, text: ""});
        setCards(existingCards);
    }

    return (
        <div id="editcard">
            <CardCoverModal show={showSearchModal} handleClose={() => { setShowSearchModal(false) }} updateCardCover={updateCardCover}></CardCoverModal>      
            <Form className="card-details">
                <Form.Text>Card Details:</Form.Text>
                <Form.Group className="w-25" >
                    <Form.Control type="text" placeholder="Enter Title *" defaultValue={cardDetails.title ?? ""} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="w-25" >
                    <Form.Control type="text" placeholder="Enter Category" defaultValue={cardDetails.category ?? ""} onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>
            </Form>
            <hr></hr>
            <Form className="card-details">
                <Form.Text>Recipient Details:</Form.Text>
                <Form.Group className="w-25" >
                    <Form.Control type="text" placeholder="Enter Name *" defaultValue={cardDetails.toName ?? ""} onChange={(e) => { setRecipientObject({ ...recipientObject, name: e.target.value }) }} />
                </Form.Group>

                <Form.Group className="w-25" >
                    <Form.Control type="email" placeholder="Enter Email *" defaultValue={cardDetails.toEmail ?? ""} onChange={(e) => { setRecipientObject({ ...recipientObject, email: e.target.value }) }} />
                </Form.Group>
            </Form>
            <hr></hr>
            <Form className="card-details">
                <Form.Text>Sender Details:</Form.Text>
                <Form.Group className="w-25" >
                    <Form.Control type="text" placeholder="Enter Name *" defaultValue={cardDetails.fromName ?? ""} onChange={(e) => { setSenderObject({ ...senderObject, name: e.target.value }) }} />
                </Form.Group>

                <Form.Group className="w-25" >
                    <Form.Control type="email" placeholder="Enter Email *" defaultValue={cardDetails.fromEmail ?? ""} onChange={(e) => { setSenderObject({ ...senderObject, email: e.target.value }) }} />
                </Form.Group>
            </Form>
            <hr></hr>
            <span><i>Wellwishers:</i></span>
            <CardGroup>
                <Row>
                    {cards && cards?.length > 0 &&
                        cards.map((gifCard, index) =>
                        <GifCard 
                        key={index} 
                        index={index} 
                        gifCard={gifCard} 
                        deleteCard={deleteCard}
                        searchCardCovers={searchCardCovers}
                        updateCardComment={updateCardComment}/>)
                    }
                </Row>
                <Button className="new-gif-card" variant="light" size="sm" onClick={addNewCard}>
                    ➕
                </Button>
            </CardGroup>
            <div id="save-changes" className="d-grid gap-2">
                <Button variant="outline-primary" size="lg" onClick={saveCardDetails}>
                    Save Changes !
                </Button>
            </div>
        </div>
    );
}