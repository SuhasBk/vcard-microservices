import { useEffect, useState } from "react";
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
import useAlert from "../../alert/useAlert";
import TriggerAPI from "../../api/Api";
import UserService from "../../auth/UserService";
import './MyCards.css';

export default function MyCards(props) {

    const [mycards, setMyCards] = useState([]); 
    const { setAlert } = useAlert();

    useEffect(() => {
        let user = props.user ? props.user : JSON.parse(UserService.getUserDetails());
        fetchMyCards(user);
    }, [props.user]);

    let fetchMyCards = (user) => {
        TriggerAPI("vcard-service", "getMyCards", "POST", user)
            .then(response => response.json())
            .then(data => {
                setMyCards(data);
            });
    }

    let editCard = () => {
        
    }

    let deleteCard = (cardId) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            TriggerAPI("vcard-service", "delete", "DELETE", { cardId: cardId })
            .then(_ => {
                setAlert("Card deleted successfully!", "success");
                fetchMyCards();
            });
        } else {
            return;
        }
    }

    return (
        <div id="mycards">
            <CardGroup>
                <Row xs={1} md={4}>
                {mycards.length > 0 &&
                    [...mycards, ...mycards, ...mycards, ...mycards].map((cardDetails, index) =>
                    // mycards.map((cardDetails, index) =>
                    <Col key={index}>
                        <Card>
                            <Card.Header>
                                <iframe title={cardDetails.cards[0]?.gif.title} src={cardDetails.cards[0]?.gif.url} />
                            </Card.Header>                        
                            <Card.Body>
                                <Card.Title>{cardDetails.title}</Card.Title>
                                <Card.Text>
                                    {cardDetails.cards[0]?.text || <small>{"<no comments>"}</small>}
                                </Card.Text>
                                <Card.Footer className="card-footer">
                                    <Button onClick={editCard} variant="primary"><small>Edit</small> ✍️</Button>
                                    <Button onClick={() => deleteCard(cardDetails.cardId)}variant="danger"><small>Delete</small>🗑</Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>)
                }
                </Row>
            </CardGroup>
        </div>
    );
}